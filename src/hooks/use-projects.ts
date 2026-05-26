import { useEffect, useState } from "react";
import projectService from "../services/projectService";
import userService from "../services/userService";
import type { Project, UserOption } from "../types/projectTypes";

export function useProjects(userId: string): {
    activeProjects: Project[];
    backlogProjects: Project[];
    archiveProjects: Project[];
    allUsers: UserOption[];
    hasLoaded: boolean;
    error: string | null;
} {
    const [activeProjects, setActiveProjects] = useState<Project[]>([]);
    const [backlogProjects, setBacklogProjects] = useState<Project[]>([]);
    const [archiveProjects, setArchiveProjects] = useState<Project[]>([]);
    const [allUsers, setAllUsers] = useState<UserOption[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userId.length === 0) {
            return;
        }

        const load = async (): Promise<void> => {
            try {
                const [active, backlog, archive, usersRes] = await Promise.all([
                    projectService.getProjectsByUserId(userId, "active"),
                    projectService.getProjectsByUserId(userId, "backlog"),
                    projectService.getProjectsByUserId(userId, "archive"),
                    userService.getAllUsers(),
                ]);

                setActiveProjects(active.data ?? []);
                setBacklogProjects(backlog.data ?? []);
                setArchiveProjects(archive.data ?? []);

                const options: UserOption[] = [];
                (usersRes.data.user as Array<{ full_name: string }>).forEach(
                    (u) => {
                        if (u.full_name.length > 0) {
                            options.push({
                                value: u.full_name,
                                label: u.full_name,
                            });
                        }
                    }
                );
                setAllUsers(options);
            } catch {
                setError("Failed to load projects.");
            } finally {
                setHasLoaded(true);
            }
        };

        void load();
    }, [userId]);

    return {
        activeProjects,
        backlogProjects,
        archiveProjects,
        allUsers,
        hasLoaded,
        error,
    };
}

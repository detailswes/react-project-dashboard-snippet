import axiosInstance from ".";

const projectService = {
    async saveProject(
        payload: {
            project_name: string;
            project_type: string;
            project_status: string;
            project_description: string;
            requested_by: string[] | null;
        },
        slug = ""
    ) {
        if (slug.length > 0) {
            return await axiosInstance.put(`projects/update/${slug}`, payload);
        }
        return await axiosInstance.post("projects/new", payload);
    },
    async getProjectsByUserId(userId: string, status: string) {
        if (status.length > 0) {
            return await axiosInstance.get(`projects/all/${status}/${userId}`);
        }
        return await axiosInstance.get(`projects/all/${userId}`);
    },
    // getProjectBySlug(slug) {
    //     return axiosInstance.get(`projects/${slug}`);
    // },
    // deleteProject(slug) {
    //     return axiosInstance.delete(`projects/${slug}`);
    // },
    // updateProjectStatus(slug, payload) {
    //     return axiosInstance.put(`projects/update/status/${slug}`, payload);
    // },
    // updateProjectWaitingStatus(slug, status) {
    //     return axiosInstance.put(`projects/update/waiting-status/${slug}`, {
    //         status,
    //     });
    // },
};

export default projectService;

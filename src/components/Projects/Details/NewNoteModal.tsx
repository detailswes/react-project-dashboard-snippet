import React, { type ReactElement, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { quillModules } from "../../../config/quill-editor";

const NewNoteModal = (props: {
    setNoteContent: (arg0: string) => void;
}): ReactElement => {
    const [value, setValue] = useState("");
    return (
        <div className="modal-content">
            <div className="form-control">
                <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    value={value}
                    onChange={(e) => {
                        setValue(e);
                        props.setNoteContent(e);
                    }}
                />
            </div>
        </div>
    );
};

export default NewNoteModal;

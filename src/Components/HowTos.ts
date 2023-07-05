import { Modal, Documents } from "dattatable";
import { Components } from "gd-sprest-bs";
import strings from "../strings";

/**
 * Templates Modal
 */

// Export
export class HowToModal {

    // Private Vars
    

    // Constructor
    constructor(el: HTMLElement) {


        // Render the modal
        this.render(el);
    }

    // Render method
    private render(el: HTMLElement) {

        // Create the Modal Header
        Modal.setHeader("Documents Folder");

        // Create the attachments table
        let _el = document.createElement("div");
        let docs = new Documents({
            el,
            listName: strings.DocumentLibraries.set2,
            canDelete: true,
            canEdit: true,
            canView: true,
            onNavigationRendering: (props) => {
                props.brand = "How to Documents";
            }
        });

        // Set the body
        Modal.setBody(el);

        // Modal Props
        Modal.setScrollable(true);
        Modal.setType(Components.ModalTypes.XLarge);

        // Show
        Modal.show();
    }
}
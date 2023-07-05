import { Modal, Documents } from "dattatable";
import { Components } from "gd-sprest-bs";
import { DataSource, IItem } from "../ds";
import strings from "../strings";

/**
 * Templates Modal
 */

// Export
export class SupportModal {
    private _el: HTMLElement = null;
    private _docs: Documents = null;


    // Constructor
    constructor(el: HTMLElement) {
        this._el = el;



        // Render the modal
        this.render();
    }

    // Render method
    private render() {

        // Create the Modal Header
        Modal.setHeader("Contact Support Folder");

        // Create the attachments table
        let el = document.createElement("div");
        let docs = new Documents({
            el,
            listName: strings.Lists.Main,
            canDelete: true,
            canEdit: true,
            canView: true,
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
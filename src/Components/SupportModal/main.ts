import { Modal, Documents } from "dattatable";
import { Components } from "gd-sprest-bs";
import Strings from "../../strings";
import { questionSquare } from "gd-sprest-bs/build/icons/svgs";


/**
 * Templates Modal
 */

// Export
export class SupportModal {

    // Private Vars


    // Constructor
    constructor(el: HTMLElement) {

    

        // Render the modal
        this.render(el);
    }

    // Render method
    private render(el: HTMLElement) {


        let elBody = document.createElement('div');
        let elAccordian = document.createElement('div');
        let elSideBar = document.createElement('div');
        let elTemplates = document.createElement('div');
        let elHowTos = document.createElement('div');
        let elHeader = document.createElement('div');
        let elHeaderIcon = questionSquare(28);       
    
        // Modal Header
        elHeader.appendChild(elHeaderIcon);
        elHeader.innerHTML = "Support Documents";
        Modal.setHeader(elHeader);

        // Set the body
        Modal.setBody(elBody);
        elBody.appendChild(elAccordian);
        elBody.appendChild(elSideBar);
        // body props
        elBody.className = "container-fluid row";
        elAccordian.className = "col-8";
        elSideBar.className = "col-4";

        // Modal Props
        Modal.setScrollable(true);
        Modal.setType(Components.ModalTypes.Full);

        // Show
        Modal.show();

       


        // MAIN PANEL
        Components.Accordion({
            el: elAccordian,
            items: [
                {
                    header: "Templates",
                    content: elTemplates,
                    showFl: true,
                    className: "Accord1",
                },
                {
                    header: "How To's",
                    showFl: false,
                    content: elHowTos,
                    className: "Accord2"
                }
            ]
        });


        // SIDE BAR PANEL
        Components.Card({
            el: elSideBar,
            body: [
                {
                    title: "Contact List",
                    subTitle: "List of available POC's",
                    onRender: (el) => {

                        // divs
                        let bar = document.createElement('div');
                        el.appendChild(bar);
                        bar.className = "py-5"; 
                        Components.Card({
                            el: bar,
                            
                            body: [
                                {
                                    className: "py-4",
                                    onRender: (el, card) => {
                                        Components.Table({
                                            el,
                                            columns: [
                                            { name: "a0", title: "Actions", isHidden: true },
                                            { name: "a1", title: "Col 1" },
                                            { name: "a2", title: "Col 2" },
                                            { name: "a3", title: "Col 3" }
                                        ],
                                            rows: [
                                            { a0: "1", a1: "1.1", a2: "1.2", a3: "1.3" },
                                            { a0: "2", a1: "2.1", a2: "2.2", a3: "2.3" },
                                            { a0: "3", a1: "3.1", a2: "3.2", a3: "3.3" },
                                            { a0: "4", a1: "4.1", a2: "4.2", a3: "4.3" },
                                            { a0: "5", a1: "5.1", a2: "5.2", a3: "5.3" },
                                            { a0: "6", a1: "6.1", a2: "6.2", a3: "6.3" },
                                            { a0: "7", a1: "7.1", a2: "7.2", a3: "7.3" },
                                            { a0: "8", a1: "8.1", a2: "8.2", a3: "8.3" },
                                            { a0: "9", a1: "9.1", a2: "9.2", a3: "9.3" }
                                        ]
                                        });
                                    },
                                    onRenderTitle: el => {
                                        el.innerHTML = "CSS Point of contacts";
                                        el.className = "text-center text-bg-dark";
                                    }
                                }
                                
                            ]
                        });
                    }
                }
            ]


        });

        //Templates
        new Documents({
            el: elTemplates,
            listName: Strings.DocumentLibraries.set1,
            onNavigationRendering: (props) => {
                props.brand = `Available Templates`;
            }

        });

        //How To's
        new Documents({
            el: elHowTos,
            listName: Strings.DocumentLibraries.set2,
            onNavigationRendering: (props) => {
                props.brand = `Available How To Documents for assistance in proccessing a request`;
            }
        });

    }

    
}
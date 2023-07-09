import { Modal, Documents } from "dattatable";
import { Components } from "gd-sprest-bs";
import strings from "../../strings";


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
    

        elBody.innerHTML = 
        `
        
        <div class="container-fluid p-3 m-0">
            <div class="row">


                <div class="border col-7 text-center">

               ${Components.Accordion({
                   el: elAccordian,
                   items: [
                       {
                           header: "test"
                       }
                   ]
               })}
                
                
                </div>


                <div class="border col-5 text-center">
                    <div class="col bg-secondary bg-opacity-10 text-center">TEST</div>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td colspan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        
        `;


       





        // Modal Header
        Modal.setHeader(el)

        // Set the body
        Modal.setBody(elBody);
        

        // Modal Props
        Modal.setScrollable(true);
        Modal.setType(Components.ModalTypes.Full);

        // Show
        Modal.show();

    }

    
}
import { Dashboard, ItemForm, Documents } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import { DataSource, IItem } from "./ds";
import Strings from "./strings";
import { folderFill } from "gd-sprest-bs/build/icons/svgs/folderFill";
import { pencilSquare } from "gd-sprest-bs/build/icons/svgs/pencilSquare";
import { plusSquare } from "gd-sprest-bs/build/icons/svgs/plusSquare";
import * as moment from "moment";
import { DocModal } from "./Components/DocModal";
import { SupportModal } from "./Components/HelpModal";

/**
 * Main Application
 */
export class App {
    // Constructor
    constructor(el: HTMLElement) {
        // Render the dashboard
        this.render(el);
        // Set the list for Item Form
        ItemForm.ListName = Strings.Lists.Main;
    } 
    // Renders the dashboard
    private render(el: HTMLElement) {
        // Create the dashboard
        let dashboard = new Dashboard({
            el,
            hideHeader: true,
            useModal: true,
            navigation: {
                title: Strings.ProjectName,
                items: [
                    
                ],
                itemsEnd: [
                    {
                        text: "Help",
                        className: "btn-outline-light btn-sm me-3",
                        isButton: true,
                        iconType: plusSquare,
                        iconSize: 18,
                        iconClassName: "me-2 mb-1",
                        onClick: () => {
                            new SupportModal(el)
                        }
                    },
                    {
                        text: "Templates",
                        className: "btn-outline-light btn-sm me-3",
                        isButton: true,
                        iconType: plusSquare,
                        iconSize: 18,
                        iconClassName: "me-2 mb-1",
                        onClick: () => {
                            new SupportModal(el)
                        }
                    },
                    {
                        text: "How To's",
                        className: "btn-outline-light btn-sm me-3",
                        isButton: true,
                        iconType: plusSquare,
                        iconSize: 18,
                        iconClassName: "me-2 mb-1",
                        onClick: () => {
                            new SupportModal(el)
                        }
                    }
                ],
                onRendering: props => {
                    props.className = "navbar navbar-dark bg-dark rounded-top"
                },
                onRendered: () => {
                    // Update classes for the navBar container
                    let navEl = el.firstChild as HTMLElement;
                    navEl.classList.remove("bg-primary");
                    navEl.classList.remove("rounded");
                    navEl.classList.remove("rounded-bottom");
                    navEl.classList.add("rounded-top");
                    navEl.classList.add("border");
                    navEl.classList.add("border-dark");
                    navEl.classList.add("border-2");
                    navEl.id = "DashboardNav";
                }
            },
            subNavigation: {
                title: Strings.subNavigationTitle,
                items: [
                    {
                        onRender: (el) => {
                            // render tooltip
                            Components.Tooltip({
                                el,
                                content: "Submit a request",
                                btnProps: {
                                    id: "new_btn",
                                    className: "mb-3",
                                    text: "New Request",
                                    iconType: plusSquare,
                                    iconSize: 18,
                                    iconClassName: "me-2 mb-1",
                                    type: Components.ButtonTypes.OutlineDark,
                                    onClick: () => {
                                        // Show the new form
                                        DataSource.List.newForm({
                                            // Removes the Title field from the
                                            onCreateEditForm: props => {
                                                props.excludeFields = ["Title", "LinkTitle", "AssignedTo"];
                                                
                                                return props
                                            },
                                            onSetHeader: props => {props.innerHTML = "Submit a request"; return props},
                                            onSetFooter: (elFooter)  => {
                                                // Create a new button
                                                Components.Button({
                                                    el: elFooter,
                                                    text: "Submit",
                                                    className: "",
                                                    isSmall: true,
                                                    type: Components.ButtonTypes.OutlinePrimary,
                                                    onClick: () => {
                                                        // Saves the item
                                                        ItemForm.save();
                                                    }
                                                });
                                                // Removes the old button
                                               let old = elFooter.firstChild as HTMLElement;
                                               old.style.display = "none";
                                                
                                            },
                                            onUpdate: () => {
                                                // Refresh the data
                                                DataSource.refresh().then(() => {
                                                    // Refresh the table
                                                    dashboard.refresh(DataSource.ListItems);
                                                });
                                            },
                                        });
                                    }
                                },
                                type: Components.TooltipTypes.Secondary
                            });                         
                        },
                        
                    }
                ]
            },
            filters: {
                items: [
                {
                    header: "By Status",
                    items: DataSource.StatusFilters,
                    onFilter: (value: string) => {
                        // Filter the table
                        dashboard.filter(2, value);
                    }
                },
                {
                    header: "By Type",
                    items: DataSource.TypeFilters,
                    onFilter: (value: string) => {
                        // Filter the table
                        dashboard.filter(1, value);
                    }
                }
            ]
            },
            footer: {
                itemsEnd: [
                    {
                        text: "v" + Strings.Version
                    }
                ]
            },
            table: {
                rows: DataSource.ListItems,
                dtProps: {
                    dom: 'rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',
                    columnDefs: [
                        {
                            "targets": 0,
                            "orderable": false,
                            "searchable": false
                        }
                    ],
                    createdRow: function (row, data, index) {
                        jQuery('td', row).addClass('align-middle');
                    },
                    drawCallback: function (settings) {
                        let api = new jQuery.fn.dataTable.Api(settings) as any;
                        jQuery(api.context[0].nTable).removeClass('no-footer');
                        jQuery(api.context[0].nTable).addClass('tbl-footer');
                        jQuery(api.context[0].nTable).addClass('table-striped');
                        jQuery(api.context[0].nTableWrapper).find('.dataTables_info').addClass('text-center');
                        jQuery(api.context[0].nTableWrapper).find('.dataTables_length').addClass('pt-2');
                        jQuery(api.context[0].nTableWrapper).find('.dataTables_paginate').addClass('pt-03');
                    },
                    headerCallback: function (thead, data, start, end, display) {
                        jQuery('th', thead).addClass('align-middle');
                    },
                    // Order by the 1st column by default; ascending
                    order: [[1, "asc"]]
                },
                columns: [
                    {
                        name: "",
                        title: "",
                        onRenderCell(el, column, item: IItem) {
                            Components.Tooltip({
                                el: el,
                                content: "Edit Item",
                                btnProps: {
                                    // Render the button
                                    iconType: pencilSquare,
                                    iconSize: 33,
                                    isSmall: true,
                                    type: Components.ButtonTypes.OutlineSecondary,
                                    id: "btn_edit",
                                    onClick: () => {
                                        // Show the edit form
                                        ItemForm.edit({
                                            onSetHeader(el) {
                                                // Set the Header
                                                el.innerHTML = "Update" + " " + `${item.Requester.Title}` + "'s" + " " + "Request";
                                            },
                                            // Removes the Title field (we're not using it)
                                            onCreateEditForm: props => { props.excludeFields = [
                                                "Title"
                                            ]; return props },
                                            itemId: item.Id,
                                            onUpdate: () => {
                                                // Refresh the data
                                                DataSource.init().then(items => {
                                                    // Update the data
                                                    this.refresh(items);
                                                });
                                                window.location.reload();
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    },
                    {
                        name: "ItemType",
                        title: "Type"
                    },
                    {
                        name: "Status",
                        title: "Status"
                    },
                    {
                        name: "",
                        title: "Requester",
                        onRenderCell: (el, column, item: IItem) => {
                            // Grabs the users name
                            el.innerHTML = item ? item.Requester.Title : "";
                        }
                    },
                    {
                        name: "",
                        title: "Lasst Modified",
                        onRenderCell: (el, column, item: IItem) => {
                            // Grabs the OOB Last Mod Date
                            let mod = item ? item.Modified : "";
                            el.innerHTML =  moment(mod).format(Strings.DateTimeFormat);
                        }
                    },
                    {
                        // 6 - Documents
                        name: "Documents",
                        title: "Documents",
                        onRenderCell: (el, column, item: IItem) => {
                            // Render the document column
                            Components.Tooltip({
                                el: el,
                                content: "Upload Documents",
                                btnProps: {
                                    iconType: folderFill,
                                    iconSize: 48,
                                    type: Components.ButtonTypes.OutlineSecondary,
                                    isSmall: true,
                                    onClick: () => {
                                        // Creates the Document Modal for each item
                                        new DocModal(el, item)
                                    }
                                }
                            });
                        }
                    }
                ],
                onRendered: props => {
                    props.className = "px-4";
                }
            }
        });

        let btn_props = document.getElementById("new_btn");
        btn_props.classList.remove("btn-icon");

        // let btn_editprops = document.querySelectorAll("[id='btn_edit']");
        // for(var i = 0; i < btn_editprops.length; i++) 
        // btn_editprops[i].classList.remove('btn-icon');
        
    }

    
}
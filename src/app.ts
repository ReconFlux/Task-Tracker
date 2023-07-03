import { Dashboard, ItemForm } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import { DataSource, IItem } from "./ds";
import Strings from "./strings";
import { folderFill } from "gd-sprest-bs/build/icons/svgs/folderFill";
import { pencilSquare } from "gd-sprest-bs/build/icons/svgs/pencilSquare";
import * as moment from "moment";

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
                    {
                        className: "btn-outline-light",
                        text: "Create Item",
                        isButton: true,
                        onClick: () => {
                            // Show the new form
                            DataSource.List.newForm({
                                onCreateEditForm: props => {props.excludeFields = ["Title", "LinkTitle", "AssignedTo"]; return props},
                                onUpdate: () => {
                                    // Refresh the data
                                    DataSource.refresh().then(() => {
                                        // Refresh the table
                                        dashboard.refresh(DataSource.ListItems);
                                    });
                                }
                            });
                        }
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
                                    iconSize: 18,
                                    isLarge: true,
                                    type: Components.ButtonTypes.OutlineSecondary,
                                    onClick: () => {
                                        // Show the edit form
                                        ItemForm.edit({
                                            onSetHeader(el) {
                                                el.innerHTML = "Update Task";
                                            },
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
                            // Grabs the users Title
                            el.innerHTML = item ? item.Requester.Title : "";
                        }
                    },
                    {
                        name: "",
                        title: "Lasst Modified",
                        onRenderCell: (el, column, item: IItem) => {
                            // Grabs the users Title
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
                                    iconSize: 28,
                                    type: Components.ButtonTypes.OutlineSecondary,
                                    isLarge: true,
                                    onClick: () => {
                                        
                                    }
                                }
                            });
                        }
                    }
                ]
                
            }
        });
    }

//     // Edit form properties for Step 3
//     editProps(props: Components.IListFormEditProps) {
//         props.excludeFields = [
//             "Title"
//         ]
//         return props;
//     }
// }

editProps(props: Components.IListFormEditProps) {
    props.excludeFields = [
        "Title",
        "LinkTitle"
    ]
    return props;
}

}
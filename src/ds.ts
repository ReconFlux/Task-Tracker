import { Dashboard } from "dattatable";
import { Components, List, Types, Web } from "gd-sprest-bs";
import Strings from "./strings";


// Item
export interface IItem extends Types.SP.ListItem {
    Objectives: string;
    Status: string;
    ItemType: string;
    AssignedTo: { Id: number; Title: string; }
    Requester: { Id: number; Title: string; }
    Modified: string;
}


/**
 * Data Source
 */
export class DataSource {

    // Initializes the application
    static init(): PromiseLike<void> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Load the data
            this.load().then(() => {
                // Load the templates library
                this.loadTemplateFiles().then(() => {
                    // load the how to document library
                    this.loadHowtoFiles().then(() => {
                        // Load the status filters
                            this.LoadLOEFilters().then(() => {
                                // Load Type Filters
                                    this.LoadTypeFilters().then(() => {
                        // Resolve the request
                        resolve();
                    }, reject);
                }, reject);
            }, reject);
            }, reject);
        }, reject);
        });
    }



    // Loads the list data
    private static _items: IItem[] = null;
    static get Items(): IItem[] { return this._items; }
    static load(): PromiseLike<IItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Load the data
            List(Strings.Lists.Main).Items().query({

                GetAllItems: true,
                Expand: ["AssignedTo", "Requester"],
                OrderBy: ["Title"],
                Select: ["*", "AssignedTo/Id", "AssignedTo/Title", "Requester/Id", "Requester/Title"],
                Top: 5000
            }).execute(
                // Success
                items => {
                    // Set the items
                    this._items = items.results as any;

                    // Resolve the request
                    resolve(this._items);
                },
                // Error
                () => { reject(); }
            );
        });
    }



    // Templates Files 
    private static _tempFiles: Types.SP.File[];
    static get tempFiles(): Types.SP.File[] { return this._tempFiles; }
    private static _folders: Types.SP.FolderOData[];
    static get Folders(): Types.SP.FolderOData[] { return this._folders; }
    static loadTemplateFiles(): PromiseLike<void> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Load the library
            List(Strings.DocumentLibraries.set1).RootFolder().query({
                Expand: [
                    "Folders", "Folders/Files", "Folders/Files/Author", "Folders/Files/ListItemAllFields", "Folders/Files/ModifiedBy",
                    "Files", "Files/Author", "Files/ListItemAllFields", "Files/ModifiedBy"
                ]
            }).execute(folder => {
                // Set the folders and files
                this._tempFiles = folder.Files.results;
                this._folders = [];
                for (let i = 0; i < folder.Folders.results.length; i++) {
                    let subFolder = folder.Folders.results[i];
                    // Ignore the OTB Forms internal folder  
                    if (subFolder.Name != "Forms") { this._folders.push(subFolder as any); }
                }

                // Resolve the request
                resolve();
            }, reject);
        });
    }

    // How Tos Document Library Here
    private static _howtoFiles: Types.SP.File[];
    static get howtoFiles(): Types.SP.File[] { return this._howtoFiles; }
    private static _Howfolders: Types.SP.FolderOData[];
    static get HowFolders(): Types.SP.FolderOData[] { return this._Howfolders; }
    static loadHowtoFiles(): PromiseLike<void> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Load the library
            List(Strings.DocumentLibraries.set1).RootFolder().query({
                Expand: [
                    "Folders", "Folders/Files", "Folders/Files/Author", "Folders/Files/ListItemAllFields", "Folders/Files/ModifiedBy",
                    "Files", "Files/Author", "Files/ListItemAllFields", "Files/ModifiedBy"
                ]
            }).execute(folder => {
                // Set the folders and files
                this._howtoFiles = folder.Files.results;
                this._folders = [];
                for (let i = 0; i < folder.Folders.results.length; i++) {
                    let subFolder = folder.Folders.results[i];
                    // Ignore the OTB Forms internal folder  
                    if (subFolder.Name != "Forms") { this._folders.push(subFolder as any); }
                }

                // Resolve the request
                resolve();
            }, reject);
        });
    }

    // Gets the item id from the query string
    static getItemIdFromQS() {
        // Get the id from the querystring
        let qs = document.location.search.split('?');
        qs = qs.length > 1 ? qs[1].split('&') : [];
        for (let i = 0; i < qs.length; i++) {
            let qsItem = qs[i].split('=');
            let key = qsItem[0];
            let value = qsItem[1];

            // See if this is the "id" key
            if (key == "ID") {
                // Return the item
                return parseInt(value);
            }
        }
    }

    private static _dashboard: Dashboard = null;
    static get Dashboard(): Dashboard { return this._dashboard; }
    static setDashBoard(dashboard: Dashboard) {
        this._dashboard = dashboard;
    }
    static refreshDashboard() {
        if (this._dashboard != null) {
            this.load().then((items) => {
                this._dashboard.refresh(items);
            });
        }
    }


    // LOE Filters
    private static _LOEFilters: Components.ICheckboxGroupItem[] = null;
    static get LOEFilters(): Components.ICheckboxGroupItem[] { return this._LOEFilters; }
    static LoadLOEFilters(): PromiseLike<Components.ICheckboxGroupItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the status field
            List(Strings.Lists.Main).Fields("Status").execute((fld: Types.SP.FieldChoice) => {
                let items: Components.ICheckboxGroupItem[] = [];

                // Parse the choices
                for (let i = 0; i < fld.Choices.results.length; i++) {
                    // Add an item
                    items.push({
                        label: fld.Choices.results[i],
                        type: Components.CheckboxGroupTypes.Switch,
                        isSelected: false
                    });
                }

                // Set the filters and resolve the promise
                this._LOEFilters = items;
                resolve(items);
            }, reject);
        });
    }

    // LOE Filters
    private static _TypeFilters: Components.ICheckboxGroupItem[] = null;
    static get TypeFilters(): Components.ICheckboxGroupItem[] { return this._TypeFilters; }
    static LoadTypeFilters(): PromiseLike<Components.ICheckboxGroupItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the status field
            List(Strings.Lists.Main).Fields("ItemType").execute((fld: Types.SP.FieldChoice) => {
                let items: Components.ICheckboxGroupItem[] = [];

                // Parse the choices
                for (let i = 0; i < fld.Choices.results.length; i++) {
                    // Add an item
                    items.push({
                        label: fld.Choices.results[i],
                        type: Components.CheckboxGroupTypes.Switch,
                        isSelected: false
                    });
                }

                // Set the filters and resolve the promise
                this._TypeFilters = items;
                resolve(items);
            }, reject);
        });
    }


}
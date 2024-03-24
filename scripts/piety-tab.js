export class Piety {
    static app = null;

    static async init() {
        //registerSettings();
    
        Piety.SOCKET = "module.piety";
        Piety._addPietyTab();
      }

    static _addPietyTab() {
        const characterSheet = dnd5e.applications.actor.ActorSheet5eCharacter2;
        characterSheet.TABS.push({
        tab: "piety", label: "Piety", icon: "fa-solid fa-hands-holding-circle"
        });
    }
      
}

Hooks.once('init', Piety.init);

Hooks.on('renderActorSheet5eCharacter2', async (characterSheet, html, data) => {

    var pietyTemplate = await renderTemplate('modules/piety/templates/piety-tab.hbs', {

    });
    let tabBodies = $('div.tab[data-group="primary"]');
    tabBodies[tabBodies.length-1].insertAdjacentHTML('afterend', pietyTemplate);
});
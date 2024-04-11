import {registerSettings } from "./settings.mjs";
/**
 * Quickly select a game setting.
 * @param {String} key 
 * @returns The game setting based on key.
 */
export let setting = key => {
  return game.settings.get("piety", key);
};

export class Piety {
    static app = null;

    static async init() {
        registerSettings();
        Piety.SOCKET = "module.piety";
        Piety._addPietyTab();
      }

    static _addPietyTab() {
        const characterSheet = dnd5e.applications.actor.ActorSheet5eCharacter2;
        characterSheet.TABS.push({
        tab: "piety", label: "Piety", icon: "fa-solid fa-hands-holding-circle"
        });
    }

    static incrementPiety(actor, amount) {
      let oldScore = actor.getFlag('piety', 'pietyScore');
      actor.setFlag('piety', 'pietyScore', oldScore + amount);
    }
      
    // static async getData(options ={}) {
    //   const context = {};
    //   context.descriptionHTML = await TextEditor.enrichHTML(context.flags.piety.description, {async: true});

    //   return {
    //     context: context
    //   }
    // }
}

Hooks.once('init', Piety.init);

Hooks.on('renderActorSheet5eCharacter2', async (characterSheet, html, data) => {
    Handlebars.registerHelper('newlineToBreak', (aString) => {
      let html = aString;
      if (aString) {
        html = "<p>" + aString.replace('\n', '<br>') + "</p>";
      }
      return html;
    });
    Handlebars.registerHelper('gte', (first, second) => {
      if (first >= second) {
        return true;
      } else {
        return false;
      }
    });

    const character = characterSheet.actor;
    const flags = character.flags["piety"];
    const div = document.createElement("DIV");

    character.setFlag('piety', 'deityName', flags?.deityName ?? "");
    character.setFlag('piety', 'pietyScore', flags?.pietyScore ?? 1);
    character.setFlag('piety', 'description', flags?.description ?? "");
    character.setFlag('piety', 'alignment', flags?.alignment ?? "");
    character.setFlag('piety', 'classes', flags?.classes ?? "");
    character.setFlag('piety', 'domains', flags?.domains ?? "");
    character.setFlag('piety', 'backgrounds', flags?.backgrounds ?? "");
    character.setFlag('piety', 'ideals', flags?.ideals ?? []);
    character.setFlag('piety', 'banes', flags?.banes ?? []);
    character.setFlag('piety', 'gift1', flags?.gift1 ?? "");
    character.setFlag('piety', 'gift2', flags?.gift2 ?? "");
    character.setFlag('piety', 'gift3', flags?.gift3 ?? "");
    character.setFlag('piety', 'gift4', flags?.gift4 ?? "");

    div.innerHTML = await renderTemplate('modules/piety/templates/piety-tab.hbs', {
        piety: character.flags['piety'],
        isActive:characterSheet._tabs[0].active === 'piety' ? "active" : "",
        isEdit: characterSheet.constructor.MODES.EDIT === characterSheet._mode,
        threshold1: setting('first-threshold'),
        threshold2: setting("second-threshold"),
        threshold3: setting("third-threshold"),
        threshold4: setting("fourth-threshold")
    });
    html[0].querySelector(".tab-body").appendChild(div.firstElementChild);

    // Piety Score Actions
  $("button[data-action='piety-score-decrease']").on("click", async (event) => {
    if (character.getFlag('piety', 'pietyScore') > 1) {
      Piety.incrementPiety(character, -1);
    }
  });
  $("button[data-action='piety-score-increase']").on("click", async (event) => {
    Piety.incrementPiety(character, 1);
  });

  $('a[data-action="add-ideal-bane"]').on('click', async (html) => {
    const field = $(html.target).parents('div[data-field]').data('field');
    const list = character.flags.piety[field];
    return character.update({ [`flags.piety.${field}`]: [...list, ""] });
  });

  $('a[data-action="delete-ideal-bane"]').on("click", async (html) => { // FIXME: Deletes 0-th index every time.
    let index = parseInt($(html.currentTarget).data('index'));
    if ($(html.target).parents('div[data-field]').data('field') == 'ideals') {
        await character.flags['piety'].ideals.splice(index, 1);
        character.setFlag('piety', 'ideals', character.flags['piety'].ideals);
    }
    else if ($(html.target).parents('div[data-field]').data('field') == 'banes') {
      await character.flags['piety'].banes.splice(index, 1);
      character.setFlag('piety', 'banes', character.flags['piety'].banes);
    }
  });

  $("div[data-field] input").on("keyup", async (html) => {
    let value = $(html.target).val();
    let index = parseInt($(html.target).data('index'));
    if ($(html.target).parents('div[data-field]').data('field') == 'ideals') {
    await character.flags['piety'].ideals.splice(index, 1, value);
    }
    else if ($(html.target).parents('div[data-field]').data('field') == 'banes') {
      await character.flags['piety'].banes.splice(index, 1, value);
    }
  });

});
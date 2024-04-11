export const registerSettings = function() {
    let module = "piety";

    // Piety Score Thresholds
  game.settings.register(module, "first-threshold", {
    name: "First Threshold",
    hint: "The Piety score players must reach to get their first Piety Gift.",
    scope: "world",
    config: true,
    requiresReload: true,
    type: Number,
    range: {
      min: 1,
      max: 50,
      step: 1
    },
    default: 3,
    onChange: (value) => {
      game.user.setFlag(module, "threshold1", value);
    }
  });
  game.settings.register(module, "second-threshold", {
    name: "Second Threshold",
    hint: "The Piety score players must reach to get their second Piety Gift.",
    scope: "world",
    config: true,
    requiresReload: true,
    type: Number,
    range: {
      min: 1,
      max: 50,
      step: 1
    },
    default: 10,
    onChange: (value) => {
      game.user.setFlag(module, "threshold2", value);
    }
  });
  game.settings.register(module, "third-threshold", {
    name: "Third Threshold",
    hint: "The Piety score players must reach to get their third Piety Gift.",
    scope: "world",
    config: true,
    requiresReload: true,
    type: Number,
    range: {
      min: 1,
      max: 50,
      step: 1
    },
    default: 25,
    onChange: (value) => {
      game.user.setFlag(module, "threshold3", value);
    }
  });
  game.settings.register(module, "fourth-threshold", {
    name: "Fourth Threshold",
    hint: "The Piety score players must reach to get their fourth Piety Gift.",
    scope: "world",
    config: true,
    requiresReload: true,
    type: Number,
    range: {
      min: 1,
      max: 50,
      step: 1
    },
    default: 50,
    onChange: (value) => {
      game.user.setFlag(module, "threshold4", value);
    }
  });
}
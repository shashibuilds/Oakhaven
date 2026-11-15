/* Oakhaven — Page 1: The Black Well
 * Phaser 3 storybook prototype, 390 x 844 portrait, one page, ~20 seconds.
 * Flow: Panel 1 (well + caption, tap) -> Panel 2 (Maren + 2 choices)
 *       -> Panel 3 (staircase + consequence banner + narration, replay).
 * Art: hand-painted gouache/watercolor, parchment #F4ECE1, ink #2B2623,
 *      lantern gold #C9A227 / #D9A441.
 */
(function () {
  'use strict';

  var W = 390, H = 844;
  var PARCHMENT = 0xF4ECE1, INK = 0x2B2623, GOLD = 0xC9A227,
      GOLD_LIGHT = 0xD9A441, PANEL_BG = 0xEFE3C8, DARK = 0x3A342E;
  var SERIF = "'IM Fell English', 'Cormorant Garamond', Georgia, 'Palatino Linotype', serif";

  var CHOICES = {
    A: {
      banner: 'Clue Gained: Abbey Seal Fragment',
      narration: 'You match the crimson wax to the archivist\u2019s ring \u2014 revealing a hidden stair beneath the well.'
    },
    B: {
      banner: 'Maren: Cornered & Suspicious',
      narration: 'She flinches, dropping a heavy iron key that unlocks the stair beneath the well.'
    }
  };

  function inkPanel(scene, x, y, w, h, fill) {
    var g = scene.add.graphics();
    g.fillStyle(fill === undefined ? 0xFFFFFF : fill, 1);
    g.fillRect(x, y, w, h);
    g.lineStyle(3, INK, 1);
    g.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
    g.lineStyle(1, INK, 0.55);
    g.strokeRect(x + 6.5, y + 6.5, w - 13, h - 13);
    return g;
  }

  function panelLabel(scene, x, y, text) {
    // Small hand-lettered panel number tag, top-left of a panel.
    var bg = scene.add.graphics();
    bg.fillStyle(INK, 1);
    bg.fillRect(x, y, 26, 18);
    var t = scene.add.text(x + 13, y + 9, text, {
      fontFamily: SERIF, fontSize: '11px', fontStyle: 'bold', color: '#F4ECE1'
    }).setOrigin(0.5);
    return scene.add.container(0, 0, [bg, t]);
  }

  function makeButton(scene, x, y, w, h, lines, onTap) {
    var c = scene.add.container(x, y);
    var bg = scene.add.graphics();
    function draw(state) {
      bg.clear();
      bg.fillStyle(state === 'down' ? 0xE3C878 : PANEL_BG, 1);
      bg.fillRoundedRect(0, 0, w, h, 6);
      bg.lineStyle(state === 'chosen' ? 4 : 2, state === 'chosen' ? GOLD : INK, 1);
      bg.strokeRoundedRect(1, 1, w - 2, h - 2, 6);
    }
    draw('up');
    var label = scene.add.text(w / 2, h / 2, lines, {
      fontFamily: SERIF, fontSize: '13px', fontStyle: 'bold', color: '#2B2623',
      align: 'center', wordWrap: { width: w - 28, useAdvancedWrap: true },
      lineSpacing: 3
    }).setOrigin(0.5);
    c.add([bg, label]);
    c.setSize(w, h);
    c.setInteractive({ useHandCursor: true });
    c.on('pointerover', function () { if (c._enabled) draw('down'); });
    c.on('pointerout', function () { if (c._enabled) draw(c._chosen ? 'chosen' : 'up'); });
    c.on('pointerdown', function () { if (c._enabled) { draw('down'); onTap(c); } });
    c._enabled = true; c._chosen = false; c._draw = draw;
    return c;
  }

  var GameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () { Phaser.Scene.call(this, { key: 'GameScene' }); },

    preload: function () {
      this.load.image('panel_well', 'assets/panel_well.png');
      this.load.image('portrait_maren', 'assets/portrait_maren.png');
      this.load.image('panel_clue', 'assets/panel_clue.png');
      this.load.image('panel_staircase', 'assets/panel_staircase.png');
    },

    create: function () {
      var s = this;
      s.step = 1;
      s.startTime = s.time.now;
      s.choiceMade = null;

      // --- Page background: aged parchment ---
      s.add.rectangle(0, 0, W, H, PARCHMENT).setOrigin(0);
      // faint paper-grain speckles (deterministic, no asset needed)
      var grain = s.add.graphics();
      grain.fillStyle(0x2B2623, 0.05);
      var seed = 7;
      for (var i = 0; i < 90; i++) {
        seed = (seed * 16807) % 2147483647;
        grain.fillCircle((seed % 390), (seed % 844), 1);
      }

      // --- Header ---
      s.add.text(W / 2, 10, '\u2726  OAKHAVEN  \u2726', {
        fontFamily: SERIF, fontSize: '15px', fontStyle: 'bold', color: '#2B2623'
      }).setOrigin(0.5, 0);
      s.add.text(W / 2, 26, 'Page 1 \u2014 The Black Well', {
        fontFamily: SERIF, fontSize: '11px', fontStyle: 'italic', color: '#5A4A3A'
      }).setOrigin(0.5, 0);
      s.timerText = s.add.text(374, 12, '0:00', {
        fontFamily: SERIF, fontSize: '11px', color: '#5A4A3A'
      }).setOrigin(1, 0);
      s.progressText = s.add.text(16, 12, '\u25CF \u25CB \u25CB', {
        fontFamily: SERIF, fontSize: '11px', color: '#2B2623'
      }).setOrigin(0, 0);

      // ================= STEP 1 — Panel 1: the well =================
      s.step1 = s.add.container(0, 0);
      // Panel fill MUST live inside the step-1 container, below the image.
      // Scene-root inkPanel was painted above the container and hid the well.
      var wellPanelBg = inkPanel(s, 16, 40, 358, 138);
      s.step1.add(wellPanelBg);
      // Well image, cropped to the panel ratio (1200x400 -> 1038x400 centre crop).
      // NOTE: never use setCrop() + setDisplaySize() together — Phaser sizes
      // from the uncropped frame, so the image renders at the cropped fraction
      // of its height. Use setScale() from the cropped dimensions instead.
      var well = s.add.image(16, 40, 'panel_well').setOrigin(0);
      well.setCrop(81, 0, 1038, 400).setScale(358 / 1038, 138 / 400);
      // keep the crop visible only inside the panel: mask it
      var maskShape = s.make.graphics({ add: false });
      maskShape.fillStyle(0xffffff, 1);
      maskShape.fillRect(19, 43, 352, 132);
      well.setMask(new Phaser.Display.Masks.GeometryMask(s, maskShape));
      // lantern glow, gently pulsing
      var glow = s.add.ellipse(96, 108, 90, 46, GOLD_LIGHT, 0.22).setOrigin(0.5);
      s.tweens.add({ targets: glow, alpha: 0.08, duration: 1100, yoyo: true, repeat: -1 });
      s.step1.add([well, glow]);
      panelLabel(s, 16, 40, '1');
      s.add.text(374, 46, '', {}); // no-op, keeps layout explicit

      var captionBg = s.add.graphics();
      captionBg.fillStyle(0xEADFC6, 1);
      captionBg.fillRect(16, 184, 358, 42);
      captionBg.lineStyle(2, INK, 1);
      captionBg.strokeRect(17, 185, 356, 40);
      s.step1.add(captionBg);
      s.step1.add(s.add.text(195, 205,
        'The chapel bell tolled thirteen times\u2014and Oakhaven\u2019s well water turned black as pitch.', {
        fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: '#2B2623',
        align: 'center', wordWrap: { width: 334, useAdvancedWrap: true }, lineSpacing: 2
      }).setOrigin(0.5));

      s.tapPrompt = s.add.text(195, 232, 'Tap to continue  \u25B8', {
        fontFamily: SERIF, fontSize: '12px', fontStyle: 'bold', color: '#8A6D1B'
      }).setOrigin(0.5);
      s.tweens.add({ targets: s.tapPrompt, alpha: 0.35, duration: 700, yoyo: true, repeat: -1 });
      s.step1.add(s.tapPrompt);

      // Whole page is tappable in Step 1.
      s.input.on('pointerdown', function () {
        if (s.step === 1) { s.showStep2(); }
      });

      // ================= STEP 2 — Maren + choices =================
      s.step2 = s.add.container(0, 0).setAlpha(0).setVisible(false);

      // Speech bubble, full width, tail pointing down-left to Maren.
      var bubble = s.add.graphics();
      bubble.fillStyle(0xFFFDF6, 1);
      bubble.fillRoundedRect(16, 250, 358, 52, 10);
      bubble.lineStyle(2, INK, 1);
      bubble.strokeRoundedRect(17, 251, 356, 50, 10);
      bubble.fillStyle(0xFFFDF6, 1);
      bubble.fillTriangle(52, 302, 72, 302, 58, 318);
      bubble.lineStyle(2, INK, 1);
      bubble.lineBetween(52, 302, 58, 318);
      bubble.lineBetween(72, 302, 58, 318);
      s.step2.add(bubble);
      s.step2.add(s.add.text(195, 276,
        '\u201CNo one touched the seal, traveler. The old forest curse woke on its own.\u201D', {
        fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: '#2B2623',
        align: 'center', wordWrap: { width: 330, useAdvancedWrap: true }, lineSpacing: 2
      }).setOrigin(0.5));

      // Left panel: Maren portrait (1120x2240, crop on head + shoulders,
      // sized to the 170x176 panel ratio: 1120x1160 crop, uniform scale)
      var leftPanelBg = inkPanel(s, 16, 322, 170, 176);
      s.step2.add(leftPanelBg);
      var maren = s.add.image(16, 322, 'portrait_maren').setOrigin(0);
      maren.setCrop(0, 150, 1120, 1160).setScale(170 / 1120, 176 / 1160);
      var marenMask = s.make.graphics({ add: false });
      marenMask.fillStyle(0xffffff, 1);
      marenMask.fillRect(19, 325, 164, 170);
      maren.setMask(new Phaser.Display.Masks.GeometryMask(s, marenMask));
      var nameBg = s.add.graphics();
      nameBg.fillStyle(INK, 0.92);
      nameBg.fillRect(16, 474, 170, 24);
      s.step2.add([maren, nameBg]);
      s.step2.add(s.add.text(101, 486, 'MAREN \u2014 ARCHIVIST', {
        fontFamily: SERIF, fontSize: '11px', fontStyle: 'bold', color: '#F4ECE1'
      }).setOrigin(0.5));
      s.step2.add(panelLabel(s, 16, 322, '2'));

      // Right panel: two parchment choice buttons.
      var rightPanelBg = inkPanel(s, 204, 322, 170, 176, PANEL_BG);
      s.step2.add(rightPanelBg);
      s.step2.add(s.add.text(289, 334, 'Mud at the well \u00B7 broken abbey seal', {
        fontFamily: SERIF, fontSize: '10px', fontStyle: 'bold', color: '#5A4A3A',
        align: 'center', wordWrap: { width: 140, useAdvancedWrap: true }, lineSpacing: 2
      }).setOrigin(0.5, 0));
      s.choiceA = makeButton(s, 212, 362, 154, 60,
        '[Inspect the Broken\nWax Seal]', function () { s.choose('A'); });
      s.choiceB = makeButton(s, 212, 430, 154, 60,
        '[Point Out Her\nMuddy Boots]', function () { s.choose('B'); });
      s.step2.add([s.choiceA, s.choiceB]);
      s.step2.add(panelLabel(s, 204, 322, '2'));

      // ================= STEP 3 — Consequence =================
      s.step3 = s.add.container(0, 0).setAlpha(0).setVisible(false);

      var stairPanelBg = inkPanel(s, 16, 508, 358, 136);
      s.step3.add(stairPanelBg);
      var stairs = s.add.image(16, 508, 'panel_staircase').setOrigin(0);
      stairs.setCrop(0, 172, 1200, 456).setScale(358 / 1200, 136 / 456);
      var stairMask = s.make.graphics({ add: false });
      stairMask.fillStyle(0xffffff, 1);
      stairMask.fillRect(19, 511, 352, 130);
      stairs.setMask(new Phaser.Display.Masks.GeometryMask(s, stairMask));
      s.step3.add(stairs);
      s.step3.add(panelLabel(s, 16, 508, '3'));

      // Wildermyth-style consequence banner: gold ribbon.
      var bannerBg = s.add.graphics();
      bannerBg.fillStyle(GOLD, 1);
      bannerBg.fillRoundedRect(16, 650, 358, 28, 4);
      bannerBg.lineStyle(2, INK, 1);
      bannerBg.strokeRoundedRect(17, 651, 356, 26, 4);
      s.step3.add(bannerBg);
      s.bannerText = s.add.text(195, 664, '', {
        fontFamily: SERIF, fontSize: '12px', fontStyle: 'bold', color: '#2B2623'
      }).setOrigin(0.5);
      s.step3.add(s.bannerText);

      // Narration + clue thumbnail (panel_clue: boots + broken seal).
      var narrBg = s.add.graphics();
      narrBg.fillStyle(0xEADFC6, 1);
      narrBg.fillRect(16, 684, 358, 50);
      narrBg.lineStyle(2, INK, 1);
      narrBg.strokeRect(17, 685, 356, 48);
      s.step3.add(narrBg);
      var clue = s.add.image(22, 690, 'panel_clue').setOrigin(0);
      clue.setDisplaySize(58, 38);
      var clueMask = s.make.graphics({ add: false });
      clueMask.fillStyle(0xffffff, 1);
      clueMask.fillRect(22, 690, 58, 38);
      clue.setMask(new Phaser.Display.Masks.GeometryMask(s, clueMask));
      s.step3.add(clue);
      s.narrationText = s.add.text(88, 709, '', {
        fontFamily: SERIF, fontSize: '12.5px', fontStyle: 'italic', color: '#2B2623',
        wordWrap: { width: 276, useAdvancedWrap: true }, lineSpacing: 2
      }).setOrigin(0, 0.5);
      s.step3.add(s.narrationText);

      // End row: completion label (left) + Replay button (bottom-right corner).
      s.completeText = s.add.text(16, 759, '', {
        fontFamily: SERIF, fontSize: '12px', fontStyle: 'bold', color: '#2B2623'
      }).setOrigin(0, 0.5);
      s.step3.add(s.completeText);
      s.replayBtn = makeButton(s, 264, 742, 110, 34, '\u21BB  Replay', function () {
        s.scene.restart();
      });
      s.step3.add(s.replayBtn);

      s.add.text(195, 786, '20 seconds \u00B7 1 page \u00B7 2 endings', {
        fontFamily: SERIF, fontSize: '10px', color: '#8A7A66'
      }).setOrigin(0.5, 0);

      // Timer (updates every 250 ms while the page is open).
      s.time.addEvent({
        delay: 250, loop: true,
        callback: function () {
          var secs = Math.floor((s.time.now - s.startTime) / 1000);
          s.timerText.setText('0:' + String(secs).padStart(2, '0'));
        }
      });
    },

    showStep2: function () {
      var s = this;
      if (s.step !== 1) { return; }
      s.step = 2;
      s.tweens.killTweensOf(s.tapPrompt);
      s.tapPrompt.setVisible(false);
      s.progressText.setText('\u25CF \u25CF \u25CB');
      s.step2.setVisible(true);
      s.tweens.add({ targets: s.step2, alpha: 1, duration: 450, ease: 'Power2' });
    },

    choose: function (key) {
      var s = this;
      if (s.step !== 2 || s.choiceMade) { return; }
      s.choiceMade = key;
      s.step = 3;
      var chosen = key === 'A' ? s.choiceA : s.choiceB;
      var other = key === 'A' ? s.choiceB : s.choiceA;
      chosen._chosen = true; chosen._draw('chosen');
      other._enabled = false; other.setAlpha(0.45);
      chosen._enabled = false;
      s.progressText.setText('\u25CF \u25CF \u25CF');
      var data = CHOICES[key];
      s.bannerText.setText('\u2726  ' + data.banner.toUpperCase() + '  \u2726');
      s.narrationText.setText(data.narration);
      var secs = Math.floor((s.time.now - s.startTime) / 1000);
      s.completeText.setText('Page 1 Complete \u2014 ' + secs + 's');
      s.step3.setVisible(true);
      s.tweens.add({ targets: s.step3, alpha: 1, duration: 500, ease: 'Power2' });
      // Small gold flash on the banner so the consequence lands.
      s.tweens.add({ targets: s.bannerText, scaleX: 1.04, scaleY: 1.04,
        duration: 180, yoyo: true, repeat: 1 });
    }
  });

  // Started from index.html only after document.fonts.ready (with a
  // timeout fallback there), so IM Fell English / Cormorant Garamond
  // are loaded before any Phaser text is drawn. Never auto-start here.
  window.startOakhavenGame = function () {
    if (window.__oakhavenStarted) { return; }
    window.__oakhavenStarted = true;
    new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'game',
      width: W, height: H,
      backgroundColor: '#F4ECE1',
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene: [GameScene]
    });
  };
})();

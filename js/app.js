/* Oakhaven — Page 1: The Black Well
 * Plain JavaScript, no framework, no modules, no build step.
 * Reads data/story.json (docs/DATA.md) and draws the page from it.
 * Story content is data only: this file never holds story text.
 * Warnings go to the console only, never on screen.
 */
(function () {
  'use strict';

  var LIMITS = { caption: 25, speech: 20, narration: 25, label: 6 };
  var reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var storyEl = document.getElementById('story');
  var titleEl = document.getElementById('page-title');
  var errorEl = document.getElementById('error');

  var state = { flags: {} };   // Flags in memory only; Replay resets them.
  var data = null;
  var page = null;
  var pageNumber = 1;
  var panelIndex = 0;          // Next panel in page.panels to consider.
  var shownCount = 0;          // Panels actually shown (for the number tags).
  var currentPanel = null;     // Latest panel, waiting for a tap or a choice.
  var finished = false;

  function wordCount(text) {
    return String(text).split(/\s+/).filter(function (w) { return w; }).length;
  }

  function showError(message) {
    storyEl.hidden = true;
    errorEl.hidden = false;
    errorEl.textContent = message;
  }

  function checkData() {
    var declared = data.flags ? Object.keys(data.flags) : [];
    var setFlags = {};
    var readFlags = {};
    var i, j, p, c, key;

    function noteUsed(flag, where) {
      if (declared.indexOf(flag) === -1) {
        console.warn('Flag used but not declared: ' + flag + ' (' + where + ')');
      }
    }
    function noteLength(field, limit, text, where) {
      if (wordCount(text) > limit) {
        console.warn('Text over the ' + limit + '-word limit for ' + field +
          ' in ' + where + ': ' + wordCount(text) + ' words');
      }
    }

    (data.pages || []).forEach(function (pg) {
      (pg.panels || []).forEach(function (panel) {
        if (panel.when) {
          for (key in panel.when) {
            noteUsed(key, panel.id + ' when');
            readFlags[key] = true;
          }
        }
        if (panel.caption) noteLength('caption', LIMITS.caption, panel.caption, panel.id);
        if (panel.speech) noteLength('speech', LIMITS.speech, panel.speech, panel.id);
        if (panel.narration) noteLength('narration', LIMITS.narration, panel.narration, panel.id);
        (panel.choices || []).forEach(function (choice) {
          noteLength('label', LIMITS.label, choice.label, panel.id + ' choice ' + choice.id);
          for (key in (choice.set || {})) {
            noteUsed(key, panel.id + ' choice ' + choice.id);
            setFlags[key] = true;
          }
        });
      });
    });
    // A flag set but never read is a bug in the data, except while later
    // pages do not exist yet (hasIronKey on Page 1).
    for (key in setFlags) {
      if (!readFlags[key]) {
        console.warn('Flag set but never read: ' + key);
      }
    }
  }

  function whenMatches(when) {
    if (!when) return true;
    for (var key in when) {
      if (state.flags[key] !== when[key]) return false;
    }
    return true;
  }

  function makeTag(number) {
    var tag = document.createElement('span');
    tag.className = 'panel-tag';
    tag.textContent = String(number);
    tag.setAttribute('aria-hidden', 'true');
    return tag;
  }

  function makeImage(src, alt) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    img.addEventListener('error', function () { warnImage(src); });
    return img;
  }

  var warnedImages = {};
  function warnImage(src) {
    if (warnedImages[src]) return;
    warnedImages[src] = true;
    console.warn('Image failed to load: ' + src);
  }

  // Preload every image in the data at start, so a panel never grows
  // after it appears and the scroll lands in the right place, even on
  // a slow connection. A failed image warns and does not block the game.
  function collectImageUrls() {
    var urls = {};
    (data.pages || []).forEach(function (pg) {
      (pg.panels || []).forEach(function (panel) {
        if (panel.image) urls[panel.image] = true;
        if (panel.thumb) urls[panel.thumb] = true;
      });
    });
    return Object.keys(urls);
  }

  function preloadImages(urls) {
    var jobs = urls.map(function (src) {
      return new Promise(function (resolve) {
        var img = new Image();
        img.onload = resolve;
        img.onerror = function () { warnImage(src); resolve(); };
        img.src = src;
      });
    });
    return Promise.all(jobs);
  }

  function makeFigure(panel) {
    var figure = document.createElement('figure');
    figure.appendChild(makeImage(panel.image, panel.alt));
    return figure;
  }

  function showNext() {
    var panel, section;
    if (finished) return;
    while (panelIndex < page.panels.length) {
      panel = page.panels[panelIndex];
      panelIndex += 1;
      if (!whenMatches(panel.when)) continue;
      shownCount += 1;
      section = renderPanel(panel, shownCount);
      storyEl.appendChild(section);
      currentPanel = section;
      section.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'nearest'
      });
      return;
    }
    finished = true;
  }

  function renderPanel(panel, number) {
    var section = document.createElement('section');
    section.className = 'panel';
    section.dataset.panelId = panel.id;

    if (panel.layout === 'split') {
      renderSplit(section, panel, number);
    } else {
      renderWide(section, panel, number);
    }
    return section;
  }

  function renderWide(section, panel, number) {
    var figure, caption, banner, row, thumb, narration, endRow, complete, replay, cont;

    figure = makeFigure(panel);
    figure.appendChild(makeTag(number));
    section.appendChild(figure);

    if (panel.caption) {
      caption = document.createElement('p');
      caption.className = 'caption';
      caption.textContent = panel.caption;
      section.appendChild(caption);
    }
    if (panel.banner) {
      banner = document.createElement('p');
      banner.className = 'banner';
      banner.textContent = '\u2726  ' + panel.banner.toUpperCase() + '  \u2726';
      section.appendChild(banner);
    }
    if (panel.narration) {
      row = document.createElement('div');
      row.className = 'narration-row';
      if (panel.thumb) {
        thumb = makeImage(panel.thumb, '');
        row.appendChild(thumb);
      }
      narration = document.createElement('p');
      narration.className = 'narration';
      narration.textContent = panel.narration;
      row.appendChild(narration);
      section.appendChild(row);
    }
    if (panel.end) {
      endRow = document.createElement('div');
      endRow.className = 'end-row';
      complete = document.createElement('p');
      complete.className = 'complete';
      complete.textContent = 'Page ' + pageNumber + ' complete';
      endRow.appendChild(complete);
      replay = document.createElement('button');
      replay.type = 'button';
      replay.className = 'replay';
      replay.textContent = '\u21BB  Replay';
      replay.addEventListener('click', function (event) {
        event.stopPropagation();
        replayPage();
      });
      endRow.appendChild(replay);
      section.appendChild(endRow);
      finished = true;
      return;
    }
    if (!panel.choices) {
      cont = document.createElement('button');
      cont.type = 'button';
      cont.className = 'continue';
      cont.textContent = 'Tap to continue  \u25B8';
      cont.addEventListener('click', function (event) {
        event.stopPropagation();
        advanceFrom(section);
      });
      section.appendChild(cont);
      section.addEventListener('click', function () { advanceFrom(section); });
    }
  }

  function renderSplit(section, panel, number) {
    var bubble, grid, leftCol, figure, name, rightCol, hint;

    bubble = document.createElement('p');
    bubble.className = 'speech';
    // The engine adds the quotation marks (docs/DATA.md).
    bubble.textContent = '\u201C' + panel.speech + '\u201D';
    section.appendChild(bubble);

    grid = document.createElement('div');
    grid.className = 'split';

    leftCol = document.createElement('div');
    leftCol.className = 'portrait-col';
    figure = makeFigure(panel);
    figure.appendChild(makeTag(number));
    leftCol.appendChild(figure);
    if (panel.name) {
      name = document.createElement('p');
      name.className = 'speaker';
      name.textContent = panel.name;
      leftCol.appendChild(name);
    }
    grid.appendChild(leftCol);

    rightCol = document.createElement('div');
    rightCol.className = 'choices-col';
    if (panel.hint) {
      hint = document.createElement('p');
      hint.className = 'hint';
      hint.textContent = panel.hint;
      rightCol.appendChild(hint);
    }
    (panel.choices || []).forEach(function (ch) {
      // Declared inside the callback, so each button's handler closes
      // over its own element (a shared outer `var` would bind them all
      // to the last button).
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice';
      // The engine adds the square brackets seen in the old version.
      btn.textContent = '[' + ch.label + ']';
      btn.addEventListener('click', function () { pickChoice(btn, ch, rightCol); });
      rightCol.appendChild(btn);
    });
    grid.appendChild(rightCol);
    section.appendChild(grid);
  }

  function pickChoice(button, choice, column) {
    var key, buttons, i;
    if (currentPanel === null || finished) return;
    for (key in (choice.set || {})) {
      state.flags[key] = choice.set[key];
    }
    buttons = column.querySelectorAll('.choice');
    for (i = 0; i < buttons.length; i += 1) {
      buttons[i].disabled = true;
      if (buttons[i] === button) buttons[i].classList.add('chosen');
    }
    currentPanel = null;
    showNext();
  }

  function advanceFrom(section) {
    if (currentPanel !== section || finished) return;
    currentPanel = null;
    showNext();
  }

  function replayPage() {
    var key;
    for (key in state.flags) state.flags[key] = false;
    panelIndex = 0;
    shownCount = 0;
    currentPanel = null;
    finished = false;
    while (storyEl.firstChild) storyEl.removeChild(storyEl.firstChild);
    showNext();
  }

  function start(pages) {
    var i;
    for (i = 0; i < pages.length; i += 1) {
      if (pages[i].id === data.start) {
        page = pages[i];
        pageNumber = i + 1;
        break;
      }
    }
    if (!page) {
      showError('Could not load the story. The start page is missing.');
      return;
    }
    titleEl.textContent = 'Page ' + pageNumber + ' \u2014 ' + page.title;
    showNext();
  }

  fetch('data/story.json')
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(function (json) {
      data = json;
      if (!data || !data.pages || !data.pages.length) {
        showError('Could not load the story. The story file is empty.');
        return;
      }
      (Object.keys(data.flags || {})).forEach(function (key) {
        state.flags[key] = false;
      });
      checkData();
      preloadImages(collectImageUrls()).then(function () {
        start(data.pages);
      });
    })
    .catch(function () {
      showError('Could not load the story. Check your connection and reload.');
    });
})();

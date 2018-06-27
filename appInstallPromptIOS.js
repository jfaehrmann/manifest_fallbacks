let appInstallPromptIOS = (() => {
    
    // Prototyp/Workaround App Install Prompt für iOS Endgeräte
    'use strict';

    let mandant = 2;
    const COOKIE = 'iOSInstallPrompt=cookie_set';
    const COOKIE_MAX_AGE = 'max-age=604800' // eine Woche

    // Konfiguration des Overlays
    let config = {

      images: {
        action: 'img/iOSaction.png',
        appIcon: 'img/icons/apple-touch-icon.png'
      },

      content: {
        title: 'Jonas Fährmann',
        text: 'Installiere die Anwendung auf deinem Home-Bildschirm, um schnell und einfach auf Inhalte zuzugreifen.',
        cta1: 'Klicke dafür ',
        cta2: ' und "Zum Home-Bildschirm"'
      },

      style: {
        overlay: {
          'display': 'flex',
          'width': '300px',
          'height': '300px',
          'min-height': 'unset',
          'margin': '0 auto',
          'padding': '2rem 1rem 0'
        },
        mainContainer: {
          'display': 'flex',
          'flex-direction': 'column',
          '-webkit-flex-direction': 'column',
          'justify-content': 'space-between',
          'align-items': 'center',
          'text-align': 'center'
        },
        appIcon: {
          'width': '50px',
          'height': 'auto',
          'box-shadow': '1px 1px 10px 0px rgba(0,0,0,.3)',
          'border-radius': '10px'
        },
        title: {
          'margin': '0',
          'font-size': '1.25rem'
        },
        text: {
          'margin': '0'
        },
        callToAction: {
          'margin': '0',
          'font-size': '0.8rem',
          'padding': '20px 0',
          'border-top': '1px solid rgba(0,0,0,.1)'
        },
        action: {
          'width': '16px',
          'height': 'auto',
          'margin': '0 2px',
          'position': 'relative',
          'top': '-4px'
        },
        closeButton: {
        }
      },

      templates: {
        overlay: '<div id="iOSInstallPrompt" class="reveal" data-reveal role="dialog"><div>',
        mainContainer: '<div></div>',
        icon: '<img>',
        title: '<h2></h2>',
        text: '<p></p>',
        callToAction: '<p></p>',
        action: '<img>',
        closeButton: '<button id="close-ios-prompt" class="close-button" data-close aria-label="schliessen" type="button"><span aria-hidden="true">&times;</span></button>',
      }
    };

    // Aktuellen Browser mit iOS Endgeräten vergleichen
    let isIos = () => {
      let userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    }

    // Prüfen ob die Anwendung bereits auf dem Home-Bildschirm installiert ist
    let isInStandaloneMode = () => {
      return 'standalone' in window.navigator && window.navigator.standalone;
    };

    // Prüfen ob Cookie bereits gesetzt ist
    let isCookieSet = () => {
      return document.cookie.includes(COOKIE);
    };

    // Prüfen ob die App Install Prompt angezeigt werden soll
    if (mandant == 2 && !isCookieSet() && !isInStandaloneMode() && isIos()) {
      // Reveal Modal mit Konfigurationen in die Seite schreiben
      let tmp = config.templates, cnt = config.content, sty = config.style, img = config.images;
      let ol = $(tmp.overlay).css(sty.overlay);
      let mc = $(tmp.mainContainer).css(sty.mainContainer);
      let cb = $(tmp.closeButton).css(sty.closeButton);
      let ico = $(tmp.icon).attr('src', '' + img.appIcon).css(sty.appIcon);
      let title = $(tmp.title).html(cnt.title).css(sty.title);
      let txt = $(tmp.text).html(cnt.text).css(sty.text);
      let act = $(tmp.action).attr('src', '' + img.action).css(sty.action);
      let cta = $(tmp.callToAction).html(cnt.cta1).css(sty.callToAction);
      cta.append(act, cnt.cta2);
      
      mc.append(cb, ico, title, txt, cta);
      
      ol.append(mc);
      $('body').append(ol);
      ol.foundation().foundation('open');
    }

    // Cookie beim schließen des Modals setzen
    let setCookie = () => {
      document.cookie = COOKIE + ';' + COOKIE_MAX_AGE;
    };

    if (mandant == 2 && !isCookieSet() && isIos()) {
      let closeButton = document.getElementById('close-ios-prompt');
      closeButton.addEventListener('click', setCookie);
    }

})();
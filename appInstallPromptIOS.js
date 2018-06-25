let appInstallPromptIOS = (() => {
 
    'use strict';

    // set variables
    const COOKIE = 'iOSInstallPrompt=Cookie_set';

    const COOKIE_MAX_AGE = ';max-age=604800' // one week

    // config
    let config = {

      images: {
        action: 'img/iOSaction.png',
        appIcon: 'img/icons/apple-touch-icon.png'
      },

      inhalt: {
        titel: 'Thalia Web App',
        text: 'Installiere dir die Anwendung auf deinem Homescreen, um schnell und einfach auf Inhalte zuzugreifen.',
        cta1: 'Klicke einfach ',
        cta2: ' und "Zum Homescreen"'
      },

      stil: {
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
        titel: {
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
        titel: '<h2></h2>',
        text: '<p></p>',
        callToAction: '<p></p>',
        action: '<img>',
        closeButton: '<button id="close-button" class="close-button" data-close aria-label="schliessen" type="button"><span aria-hidden="true">&times;</span></button>',
      }
    };

    // get the userAgent and compare to iosDevices      
    let isIos = () => {
      let userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    }

    // check if device is in standalone mode
    // let isInStandaloneMode = 'standalone' in window.navigator && window.navigator.standalone;
    let isInStandaloneMode = () => {
      return 'standalone' in window.navigator && window.navigator.standalone;
    };

    // check if cookie exist
    let isCookieSet = () => {
      return document.cookie.includes(COOKIE);
    };

    // check if an app install prompt should be shown
    if (!isCookieSet() && !isInStandaloneMode() && isIos()) {
      let tmp = config.templates, cnt = config.inhalt, sty = config.stil, img = config.images;
      let ol = $(tmp.overlay).css(sty.overlay);
      let mc = $(tmp.mainContainer).css(sty.mainContainer);
      let cb = $(tmp.closeButton).css(sty.closeButton);
      let ico = $(tmp.icon).attr('src', '' + img.appIcon).css(sty.appIcon);
      let title = $(tmp.titel).html(cnt.titel).css(sty.titel);
      let txt = $(tmp.text).html(cnt.text).css(sty.text);
      let act = $(tmp.action).attr('src', '' + img.action).css(sty.action);
      let cta = $(tmp.callToAction).html(cnt.cta1).css(sty.callToAction);
      cta.append(act, cnt.cta2);
      
      mc.append(cb, ico, title, txt, cta);
      
      ol.append(mc);
      $('body').append(ol).hide().fadeIn(1500);
      ol.foundation().foundation('open');
    }

    // set cookie on reveal close
    let setCookie = () => {
      document.cookie = COOKIE + COOKIE_MAX_AGE;
      console.log('[iOSInstallPrompt] Cookie succesfully set')
    };

    if (!isCookieSet() && isIos()) {
      let closeButton = document.getElementById('close-button');
      closeButton.addEventListener('click', setCookie);
      document.addEventListener('click', setCookie);
    }

})();




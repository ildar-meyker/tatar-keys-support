import $ from 'jquery';

// Replacements table
const lettersMap = {
    'о': 'ө',   'О': 'Ө',
    'н': 'ң',   'Н': 'Ң',
    'у': 'ү',   'У': 'Ү',
    'э': 'ә',   'Э': 'Ә',
    'ж': 'җ',   'Ж': 'Җ',
    'х': 'һ',   'Х': 'Һ'
};

// Create tooltip
const $tooltip = $('<div class="tatar-tooltip"></div>').appendTo( $( body ) ) ;

// Add tooltip styles
const $styles  = $(`<style>
    .tatar-tooltip {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      margin-top: -80px;
      z-index: 100;
      padding: 10px 20px;
      text-align: center;
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0,0,0,.4);
      background: #fff;
    }
    
    .tatar-tooltip::before {
      content: '→';
      display: block;
    }
</style>`).appendTo( $(body) );

// When active, replacement is possible
let isTooltipActive = false;

function handleKeydown(e) {

    // Replace letter
    if ( isTooltipActive && e.key === 'ArrowRight' ) {
        e.preventDefault();

        const cursorPos = e.target.selectionEnd;
        const inputValue = e.target.value;

        const newValue = inputValue.substring(0, cursorPos - 1) +
            lettersMap[inputValue.substring(cursorPos - 1, cursorPos)] +
            inputValue.substring(cursorPos);

        e.target.value = newValue;
        e.target.selectionEnd = cursorPos;

        return;
    }

    // Watch letters
    if ( e.key in lettersMap ) {
        $tooltip.css( $(e.target).offset() );
        $tooltip.html(lettersMap[e.key]).show();
        isTooltipActive = true;
    } else {
        $tooltip.hide();
        isTooltipActive = false;
    }
}


export default class TatarKeysSupport {
    constructor(selector) {
        this.selector = selector;

        $(document).on('keydown', this.selector, handleKeydown);
    }

    destroy() {
        $(document).off('keydown', this.selector, handleKeydown);
    }
}

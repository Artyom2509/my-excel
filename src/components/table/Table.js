import {ExcelComponent} from '@core/ExcelComponent';
import {isCell, shouldResize, matrix, nextSelector} from './table.functions';
import {resizeHandler} from './table.resize';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';
import $ from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor( $root, options ) {
    super( $root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
    } );
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable( 20 );
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);

    this.$on('formula:input', text => {
      this.selection.current.text(text);
    })
  }

  // onClick(event) {
  //   console.log('click', event);
  // }

  onMousedown( event ) {
    if ( shouldResize(event) ) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if(!event.shiftKey) {
        this.selection.select($target);
      } else {
        const ids = matrix($target, this.selection.current)

        const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];
    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));

      this.selection.select($next);
    }
  }

  // onMouseup( event ) {
  //   document.onmousemove = null;
  // }

  destroy() {
    super.destroy();
  }
}

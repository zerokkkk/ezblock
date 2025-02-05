import { Menu, Plugin, Editor } from "obsidian";
import { type } from "os";

export default class ExamplePlugin extends Plugin {
  async onload() {

    this.registerEvent(
      this.app.workspace.on("editor-menu", this.TransToBlockInContexMenu.bind(this))
    );
  }

  TransToBlockInContexMenu(menu: Menu, editor: Editor) {
    if (editor.somethingSelected()) {
      menu.addSeparator()
      const callout = this.isCallout(editor)
      if (callout.type===0){
        menu.addItem((item) =>
          item
              .setTitle("Trans to Block")
              .setIcon("documents")
              .onClick(() => { this.transToBlock(editor); })
        );
      }
      else {
        menu.addItem((item) =>
          item
              .setTitle("Cancel Block")
              .setIcon("documents")
              .onClick(() => { this.cancelBlock(editor, callout.type, callout.start, callout.end); })
        )
      }
    }
  };

  transToBlock(editor: Editor): void {
    const line = {
        start: editor.getCursor('from').line,
        end: editor.getCursor('to').line
    };

    let constent = '> [!notcallout]\n';
    for (let i = line.start; i <= line.end; i++) {
        constent += '> ' + editor.getLine(i) + '\n';
    }
    constent += '\n';
    editor.replaceRange(constent, {line: line.start, ch: 0}, {line: line.end, ch: editor.getLine(line.end).length});
    //const border = {start: '--(', end: ')--'};
    //editor.setLine(line.end, `${editor.getLine(line.end)}\n${border.end}`);
    //editor.setLine(line.start, `${border.start}\n${editor.getLine(line.start)}`);
    //editor.setCursor({line: line.end + 2, ch: border.end.length});
  };

  isCallout(editor: Editor): {type:number, start:number|null, end:number|null} {
    const line = {
      start: editor.getCursor('from').line,
      end: editor.getCursor('to').line
    };
    let border = {start:null,end:null}
    let type = 0
    let rg1 = /^[\u0020\t]*>[\u0020]*/
    let rg2 = /^[\u0020\t]*>[\u0020]*\[![\u0020]+\]/

    for (let i = line.start; i <= line.end; i++){
      if (type === 0 && rg1.test(editor.getLine(i))) {
        type = 1;
        border.start = i;
      }
      if (type === 1) {
        if (!rg1.test(editor.getLine(i))) {
          border.end = i-1;
        }
        else if (!border.end===null) {
          type = 0;
          break;
        }
      }
    }
    if (type===0){
      return {type:type,start:null,end:null}
    }
    else {
      if (border.start===line.start) {
        while (border.start>1 && rg1.test(editor.getLine(border.start-1))) {
          border.start--;
        }
      }
      if (border.end===line.end) {
        while (border.end<1 && rg1.test(editor.getLine(border.end+1))) {
          border.end++;
        }
      }
      if (!rg2.test(editor.getLine(border.start))) {
        type = 2;
      }
      return {type:type,start:border.start,end:border.end}
    }
  }

  cancelBlock(editor: Editor, type: number, start: number, end: number) {
    if (type===1){
      start++
    }

    const regex = /^[\u0020\t]*>[\u0020]*(.*)$/;
    
    for (let i = start; i <= end; i++){
      editor.setLine(i,editor.getLine(i).match(regex)[1])
    }

    if (type===1) {
      editor.setLine(start-1,'')
    }
  }
}
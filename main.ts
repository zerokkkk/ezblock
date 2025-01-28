import { Menu, Plugin, Editor } from "obsidian";

export default class ExamplePlugin extends Plugin {
  async onload() {

    this.registerEvent(
      this.app.workspace.on("editor-menu", this.TransToBlockInContexMenu.bind(this))
    );
  }

  TransToBlockInContexMenu(menu: Menu, editor: Editor) {
    if (editor.somethingSelected()) {
        menu.addItem((item) =>
          item
              .setTitle("Trans to Block")
              .setIcon("documents")
              .onClick(() => { this.transToBlock(editor); })
        );
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
}
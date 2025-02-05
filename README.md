# EzBlock

EzBlock is a convenient and flexible plugin for specifying blocks to facilitate block references. It implements custom callout CSS and provides an option in the right-click menu to convert the selected content into a block.

## Features

`notcallout` is a new CSS class added by the plugin.  
Content modified by this class looks almost the same as content without it, both in preview mode and reading mode.

```markdown
> [!notcallout]
> Examples
> 1. Example **1**
> 2. Example ==2==
> 3. Example *3*: $D_{3}= \langle a,b\,|\,a^3=b^{2}=1,bab=a^{-1} \rangle$
> $$
> D_{3}= \langle a,b\,|\,a^3=b^{2}=1,bab=a^{-1} \rangle
> $$
^examples-1

Examples
1. Example **1**
2. Example ==2==
3. Example *3*: $D_{3}= \langle a,b\,|\,a^3=b^{2}=1,bab=a^{-1} \rangle$
$$
D_{3}= \langle a,b\,|\,a^3=b^{2}=1,bab=a^{-1} \rangle
$$
^examples-2

[[#^examples-1|cite example with block]]
[[#^examples-2|cite example without block]]
```

Reading Mode   |   Preview Mode

<img src=".\screenshots\image-20250205160910784.png" alt="image-20250205160910784" style="zoom:50%;" /><img src=".\screenshots\image-20250205161940182.png" alt="image-20250205161940182" style="zoom:50%;" />

cite example with/without `notcallout` block

<img src=".\screenshots\image-20250205160939506.png" alt="image-20250205160939506" style="zoom:40%;" /><img src=".\screenshots\image-20250205161121287.png" alt="image-20250205161121287" style="zoom:40%;" />

The plugin also adds a shortcut feature in the right-click menu to convert selected content into a `notcallout` block or to unblock a selected block.
- When converting to a `notcallout` block, the range includes all lines within the selected area.
- When unblocking, the selected area must contain only one block (which can be quote or callout of any class; only the outermost block is counted).

### Limitations

Due to the limitations of callouts and block references in Obsidian, nested blocks cannot be referenced.



## Installation

1. Clone this repository to your local machine:
    ```sh
    git clone https://github.com/zerokkkk/ezblock.git
    ```
2. Navigate to the project directory:
    ```sh
    cd ezblock
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

Run the project in development mode:
```sh
npm run dev
```

Build the project:
```sh
npm run build
```

## Author

* [zerokkkk](https://github.com/zerokkkk)

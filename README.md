# Truth Or Dare [![Codacy Badge](https://api.codacy.com/project/badge/Grade/e8ac2cb68fda49cfa96d15604c108ef5)](https://www.codacy.com/app/Sylhare/Truth_Or_Dare?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Sylhare/Truth_Or_Dare&amp;utm_campaign=Badge_Grade) [![AUR](https://img.shields.io/aur/license/yaourt.svg)](https://github.com/Sylhare/Truth-or-Dare/blob/master/LICENSE)

### Introduction

It's the classic game with an *adult* twist. It can be customized in settings for different type of game (with a softer version). 

It can be played on desktop and phones through [firefox](https://support.mozilla.org/en-US/products/firefox/install-and-update-firefox) with a [webserver](https://github.com/Sylhare/Truth-or-Dare#Sources) or [online](https://sylhare.github.io/Truth-or-Dare).

### How to Play

1. Download the game [here](https://github.com/Sylhare/Truth_Or_Dare/archive/master.zip)
2. Unzip the file
3. Prepare your question using the `input.csv` template
4. Start the game

    - **Automatic**: 
      - Go into script and click on `installAndStart.bat` to launch the app automatically in Windows.

    - **Manual**: 
      - Use the `csv_to_json` python script to transform the file into `output.json`
      - Click on the `Index.html` to use in your browser (We recommend Firefox or [Chrome](https://github.com/Sylhare/Truth_Or_Dare/issues/1#issuecomment-313559405))
      - Or in a webserver setting the local to the `src` directory.

5. Play the game! (click on truth or dare buttons)

> If you have trouble with **loading the file**, you can load the json file directly into the settings tab (when clicking on the `[more +]` button in settings).

### Create your questions

You have a template with the `input.csv` file (it can be opened with a spreadsheet software like excel or on Google Sheets).

- The **id** column to identify each dare with a unique number (optional).
- The **level** column is here to classify the truth or dare:
  - 0: Disgusting
  - 1: Stupid
  - 2: Normal
  - 3: Soft
  - 4: Sexy
  - 5: Hot
- The **type** column specify the type
	- Truth
	- Dare
- The **summary** column specify the content of the truth or Dare
- The **time** column will be used to set the timer in the game in seconds.
- The **turns** column will be used for the number of turns the Dare stays on.


### Sources

The librairies included:
    
- [BootStrap](http://getbootstrap.com/) CSS for the responsive design of the App
- [SweetAlert](http://t4t5.github.io/sweetalert/) for the alerting in the app (file loading or failing)
- [JQuery](https://jquery.com/) for the Javascript "code less do more".

Other Features :

- [Local file handling](https://github.com/Sylhare/Truth_Or_Dare/issues/1#issuecomment-312436151) to use the app when you don't know how or want to run a webserver.
- [Python v3.6](https://www.python.org/ftp/python/3.6.1/python-3.6.1.exe) is used for the script to convert the `.csv` file to `.json`
- A [Batchfile](https://github.com/Sylhare/Truth_Or_Dare/tree/master/script) to install Python and launch the app on a simple python webserver.

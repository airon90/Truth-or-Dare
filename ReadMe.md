# Truth Or Dare [![Codacy Badge](https://api.codacy.com/project/badge/Grade/e8ac2cb68fda49cfa96d15604c108ef5)](https://www.codacy.com/app/Sylhare/Truth_Or_Dare?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Sylhare/Truth_Or_Dare&amp;utm_campaign=Badge_Grade)
-----

It's the classic game with an *adult* twist. It can be customized in settings for different type of game.

### How to Play

1. Download the file here
2. Unzip the file
3. Prepare your question using the `input.csv` template
4. Use the `csv_to_json` python script to transform the file into `output.json`
5. Click on the `Index.html` 
	- Use in your brother (try Firefox or use the tweak for [Chrome](https://github.com/Sylhare/Truth_Or_Dare/issues/1#issuecomment-313559405))
	- In a webserver with localhost where the `index.html` file is.
	- If you have trouble with loading the file, you can load the json file directly into the settings tab (when clicking on the `[more +]` button).
6. Play the game! (click on truth or dare buttons)


#### Librairies

The project includes:
    
- [BootStrap](http://getbootstrap.com/) CSS for the design of the App
- [SweetAlert](http://t4t5.github.io/sweetalert/) for the alerting in the app (file loading or failing)
- [JQuery](https://jquery.com/) for the Javascript "code less do more".
- [Local file handling](https://github.com/Sylhare/Truth_Or_Dare/issues/1#issuecomment-312436151) to use the app when you don't know/want how to run a webserver.
- [Python v3.6](https://www.python.org/ftp/python/3.6.1/python-3.6.1.exe) is used for the script to convert the `.csv` file to `.json`
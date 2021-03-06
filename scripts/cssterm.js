$(document).ready(function(){
	// these are the special characters the javascript will look for at the beginning of a line
	var rstr = /^#/gi;	// indicates a root prompt
	var cstr = /^!/gi;	// inidicates a commented line
	var sstr = /^>/gi;	// indicates standard output

	var rprompt = "[root@localhost]# ";				// will replace occurrences of rstr
	var comment = "<div class='terminal-comment'>";	// will replace occurrences of cstr
	var stdout = "&nbsp;&nbsp;&nbsp;";				// will replace occurrences of sstr

	// the html that will be inserted to replace the shortened code
	// the terminal bar and body before the text is placed
	var termTop = '\
	<div id="terminal-window"> \
 	<div id="terminal-toolbar"> \
		<div class="terminal-top"> \
				<div class="terminal-button-left terminal-menu"> \
				<div class="terminal-menu-icon"> </div> \
				</div> \
			<div id="terminal-buttons"> \
				<div class="terminal-button terminal-close"> \
				<div class="terminal-close-icon">X</div> \
				</div>				 \
				<div class="terminal-button terminal-maximize"> \
				<div class="terminal-maximize-icon"> </div> \
				</div> \
				<div class="terminal-button terminal-minimize"> \
				<div class="terminal-minimize-icon">-</div> \
				</div> \
			</div> \
			<div id="terminal-title"> \
				Terminal - ~: root@localhost: ~ \
			</div> \
		</div> \
	</div> \
	<div id="terminal-body"><p> \
';

	// closes the html that has been inserted, ends the terminal display
	var termBot = '\
	</p> \
		<div class="terminal-cursor"></div> \
	</div> \
</div> \
';

	// tell jQuery to search for each instance of the shortened code
	$(".cssterm").each(function(){
	var myContent = $(this).text();
	var arrayContent = myContent.split('\n');
	var newString = "";
	jQuery.each(arrayContent, function() {
		// make sure there's text to avoid blank spaces
		if (this.length != 0 ) {
			// is string a root command
			if (this.charAt(0) == "#") {
				newString += this.replace(rstr, rprompt).concat("<br>\n");
			// is string a comment (don't forget to close that div)
			} else if (this.charAt(0) == "!") {
				newString += "</p>" + this.replace(cstr, comment).concat("</div>\n<p>");
			// must be stdout
			} else {
				newString += stdout + this + "<br>\n";
			}
		}
	});
	$(this).replaceWith( termTop + newString + termBot);
	});
});


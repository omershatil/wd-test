This started as an Appium test, using JavaScript Generators to expose the bug in elementByXPath.
HOWEVER, IT TURNED INTO A PROOF OF CONCEPT:
Show that it's possible to use Mocha with Generators to execute "syncronously" commands. It was required to be able to stop at break points and allow promises to fail and recover.
One challenge is that spawn() does NOT block, so, main thread returns. I use the driver to block the main thread, though allowing promises to complete.

You'll need to install required npms (I'll add a package description file soon so you could run 'npm install').
You could run this test with WebStorm, as it contains the needed project files.

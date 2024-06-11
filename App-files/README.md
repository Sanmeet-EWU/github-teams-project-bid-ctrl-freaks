<b> Install instruction </b> <br/>
-Install node.js <br/>
-Install Android Studio (optional if you want to run Android emulator)<br/>

<br/>
<br/>

Go to the command prompt and enter: <br/>
> ``npm install -g @vue/cli`` <br/>
(Installing Vue) <br/>
> ``npm install -g @ionic/cli @capacitor/assets`` <br/>
(Installing Ionic and capacitor to make emulator) <br/>
CD in command prompt to where you want to put the folder <br/>
<br/>

> ``git clone https://github.com/Sanmeet-EWU/github-teams-project-bid-ctrl-freaks.git`` <br/>
> ``cd ./github-teams-project-bid-ctrl-freaks`` <br/>
> ``cd ./App-files`` <br/>
> ``npm install @capacitor/geolocation`` <br/>
> ``npm install @capacitor/local-notifications`` <br/>
> ``npm install firebase`` <br/>
> ``npm install && ionic serve`` <br/>
(run this command should open up the app in the browser. If not then you're missing vue or ionic) <br/>
<br/>
You should now be good to open the <b>App-files folder(open the entire App-files folder or it doesn't work)</b> with a code editor like VScode (required Vue, Typescript, and Ionic extension) to edit the code within the src folder <br/>

<br/>
<br/>
<br/>

<b>Emulator Instruction</b> <br/>
In Terminal of the project and run: <br/>
*Remember to have Android Studio install and open during the first run to build  <br/>
> ``ionic cap add android`` <br/>
(add capacitor android files) <br/>
> ``ionic cap build android`` <br/>
(This should open up Android Studio and build the emulator) <br/>
> ``ionic cap run`` <br/>
(Should open up the emulator by itself *may take a while) <br/>
> ``ionic cap sync`` <br/> (if major changes and the emulator doesn't update)






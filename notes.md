### In post form when I write that onInput below register It is giving error but same If we write above register it does not gives the error (writing ...register is react hook form concept)

### second error came in post form only took nearly one hour to debug which was in {...register } part {...register('name',{})} so I should have to write this curly bracket inside I wrote it outside


### Third error in config file took five minutes I have imported  both tablesDB and TablesDB ,wanted only capital one

### error in import in login page ,I have imported the component in a wrong way,same with signup component

### fifth error not imported appwriteService in Home page

### sixth error came in authLayout cause

### at LogoutBtn after logout function '()' are missing

### at Login and signup useState was not there

### at signup component required was there instead of register

### at signup form I have used onClick in place of onSubmit

### this error took long time,In button component in place of button I wrote div

### debugger stops if it will detect code can cause error

### another beautiful error was about Select component error where what I have did is I made select component and inside that instead of writing select tag i again wrote select as a component so it causing infinite loop (recursion) caused error and dubugger paused bacaused memory stack overflowed 

### error came that unauthorized to submit file this error came because to bucket or storage we have to separately give the permissions(we give permission  in appwrite two time for columns and storage also)

### now error came cause in createPost i wrote tablesId or tablesDB instead of tableId

### while creating post I have passesd slug but I have not created slug column

### Now in error came image are not visible they are not visible cause I am calling getPost but not passing slug to it

### Error came cause getFilePreview which is appwrite method we dont have to use async await there cause if we use it there it will return promise and will cause error without it it just gives URL and we want URL only

### Disable cache option what it does every time we refresh the data it fetches the fresh data

### Images are breaking-how I debug it I removed async await from getPreview Image because it return promise but we want url then also checked that featuredImage is string only not object then I thought beacuse I havent added platform thats why error coming so added platform set permissions toggled file security otion after all these after going to network tab and clicking on url i understoof that appwrite dont give access to preview images in free tier
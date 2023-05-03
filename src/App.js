import './App.css';
import { useState , createContext , useContext } from 'react';
// the default contents for the ingredient library and the list of users are imported from json files
import libraryArray from './libraryArray';
import userList from './userList';

// Context Provider will be used to store information about the current selected ingredient, and the login state/user type
const ActiveContext = createContext();
const UserContext = createContext();


//// #### Generic Elements #### ////
// The smallest level of React Elements, these are used to display text and buttons

// Display Header Text
const Header = (props) => {
  return (
    <h1>
      {props.text}
    </h1>
  )
}

// Display Button
const Button = (props) => {
  return (
    <button className='button' onClick={props.handle}>
      {props.label}
    </button>
  );
}

// Display Tag
const Tag = (props) => {
  return (
    <button className='tag' onClick={props.handle}>
      {props.label}
    </button>
  );
}

// Display a text input bar (i.e., Search Bar/Username Input/Password Input)
const TextInputBar = (props) => {
  return (
    <div className='input-bar'>
      <label>{props.label}: </label>
      <input type="text" placeholder={props.placeholder} onChange={props.handle}/>
    </div>
  );
}


//// #### HTML Fragments #### ////
// Used to display array.map results

// Display unique unselected property string in the filter dropdown menu
const FilterHTML = (props) => {
  // When the user clicks on a filter, it's added to the filter list
  return (
    <dl className='text' onClick={() => props.handle(props.valueStr)}>
      {props.valueStr}
    </dl>
)}

// Display Ingredient objects in the library
const IngredientHTML = (props) => {
  // When the user clicks on an ingredient, it becomes the active ingredient (grab setActive from context)
  const [,setActive] = useContext(ActiveContext)
  return (
    <li className='text' onClick={() => setActive(props.obj)}>
      {props.obj.nameStr}
    </li>
)}

// Display Ingredient Editing Text Inputs
const InputHTML = (props) => {
  // When the user changes the text input, it updates the ingredient editing object (a copy of the active ingredient)
  return (
    <div>
      <input type="text" value={props.valueStr} onChange={props.handle}/>
    </div>
)}

// Display property string in the details box 
const PropertyHTML = (props) => {
  // View only: no css hover effect, no onClick event
  return (
    <dl className='property'>
      {props.valueStr}
    </dl>
)}


//// #### HTML Elements #### ////
// Specific ListBoxes, Menus, and Conditionally Visible Text

// Display Invalid Login message in the LoginBox
const InvalidLogin = () => {
  // Displays an error message if the username or password provided don't match any user in userList
  const [login,] = useContext(UserContext)
  if (login === 'Error') {
    return (
      <span style={{color: 'red'}}>
        <Header text='Invalid Login'/>
        <Header text='Please Try Again'/>
      </span>
    )};
}

// Displays the PropertyHTML elements or the InputHTML elements depending on the editState
const PropertiesListBox = (props) => {
  const [object, setObject] = props.objState
  // Updates the object prop_list when a property's text input is changed
  const handleProperty = (key, e) => {
    // get the index of the element that was changed
    const newProps = [...object.prop_list.slice(0, key), e.target.value, ...object.prop_list.slice(key, -1)]
    setObject({...object, prop_list: newProps.filter(prop => prop !== '')})}
  // Adds a new property to the object prop_list
  const addProperty = () => {
    if (object.prop_list !== []) {
      setObject({...object, prop_list: [...object.prop_list, 'New Property']})}
    else {
      setObject({...object, prop_list: ['New Property']})}}
  // If the Admin Panel is going to be displayed, the listbox needs to be shorter
  const [login,] = useContext(UserContext)
  let heightValue = '33vh'
  if (login === 'Admin') {
    heightValue = '29vh'}
// Display the current active ingredient's properties (grab active from context)
  const [active,] = useContext(ActiveContext)
  // editState determines what is displayed
  if (props.editState == false) {
    // If active is empty, display nothing
    const property_inputs = (active !== '') ? active.prop_list.map(prop => <PropertyHTML valueStr={prop} key={active.prop_list.indexOf(prop)}/>) : null
    return (
      <div className='listbox' style={{width: '47.5vw', height: heightValue}}>
        {property_inputs}
      </div>    
    )}
  else {
    // If object is empty, display nothing
    const property_inputs = (object !== '') ? object.prop_list.map(prop => <InputHTML valueStr={prop} key={object.prop_list.indexOf(prop)} handle={(e) => handleProperty(object.prop_list.indexOf(prop), e)}/>) : null
    return (
      <div className='listbox' style={{width: '47.5vw', height: heightValue}}>
        {property_inputs}
        <Button label='Add' handle={addProperty} />
      </div>
  )}
}

// Displays the IngredientHTML elements
const IngredientListBox = (props) => {
  return  (
    <div className='listbox' style={{height: '49vh'}}>
      <ol>
        {props.lib.map(ing => <IngredientHTML obj={ing} key={props.lib.indexOf(ing)}/>)}
      </ol>
    </div>
  );
}

// Displays the Filter Tags
const FilterMenu = (props) => {
  const [filterList, handleFilter] = props.filterState
  // When a tag is clicked, it's removed from the filter list
  return (
  <div className='filter-tags'>
    {filterList.map(prop => <Tag label={prop} key={filterList.indexOf(prop)} handle={() => {handleFilter(prop)}}/>)}
  </div>
  )
}

// Displays the FilterHTML elements
const DropdownMenu = (props) => {
  const [dropState, dropList] = props.dropState
  // When a filter is clicked, it's added to the filter list
  if (dropState) {
    return (
      <div className='drop-menu'>
        {dropList.map(prop => <FilterHTML valueStr={prop} key={dropList.indexOf(prop)} handle={props.handleFilter}/>)}
      </div>
    )};
}


//// #### Element Sub-Containers #### ////
// Containers for complex HTML Elements

// Sub-Container for Admin Panel
const AdminPanel = (props) => {
  const [editState, toggleEdit] = props.editState
  const [addObject, removeActive] = props.functions
  const [object, setObject] = props.objState
// Displays only if user is Admin
  const [login,] = useContext(UserContext)
  // Grab activeState from context
  const [active, setActive] = useContext(ActiveContext)
// Edit Ingredient Button
  const editIng = () => {
    toggleEdit();
    setObject(active)}
// Add New Ingredient Button
  const addIng = () => {
    setActive('');
    toggleEdit();
    setObject({nameStr: '', prop_list: []})}
// Save Button
  const handleSave = () => {
    if (object !== '') {
    toggleEdit();
    addObject(object)}}
// Cancel Button
  const cancelIng = () => {
    toggleEdit();
    setObject('')}
// editState determines what is displayed (can't access edit state unless you're an Admin)
  if (editState == true) {
    return (
      <div className='marginal'>
      <Button label='Save' handle={handleSave}/> 
      <Button label='Cancel' handle={cancelIng}/> 
      </div>
    )}
  // If you're not editing, but you're an Admin, you see the panel
  else if (login === 'Admin') {
  return (
    <div className='marginal'>
    <Button label='Add New Ingredient' handle={addIng}/> 
    <Button label='Edit Ingredient' handle={editIng}/> 
    <Button label='Remove Ingredient' handle={removeActive}/> 
    </div>
  )};
}

// Sub-Container for the Detail Header and Logout Button
const DetailHeader = (props) => {
// Handle the object name
  const [object, setObject] = props.objState
  // Updates the object nameStr when the text input is changed
  const handleName = (event) => {
    setObject({...object, nameStr: event.target.value})}
// Handle the active ingredient name
  const [active,] = useContext(ActiveContext)
  const headerStr = (active !== '') ? active.nameStr : 'Select an Ingredient'
// Grab setLogin from context to pass to the log out button
  const [,setLogin] = useContext(UserContext)
// editState is used to determine what is displayed
  if (props.editState) {
    return (
      <div className='marginal'>
          <InputHTML valueStr={object.nameStr} handleChange={handleName}/>
        <span style={{maxWidth: '5vw'}}>
          <button className='button' disabled={true}>Log Out</button>
        </span>
      </div>
    )}
  else {
    return (
      <div className='marginal'>
        <h2 style={{margin: '0px'}}>{headerStr}</h2>
        <span style={{maxWidth: '5vw'}}>
          <Button label='Log Out' handle={() => setLogin(false)}/>
        </span>
      </div>
    )};
}

// Sub-Container for the Filter Tags Box
const FilterTags = (props) => {
  return (
    <div className='dropdown' style={{gridColumn: '2/span 1'}}>
      <h2 style={{margin: '0px'}}>Filters:</h2>
      <FilterMenu filterState={props.filterState}/>
    </div>
  )
}

// Sub-Container for the Filter Dropdown Menu
const Dropdown = (props) => {
// Handles the dropdown menu state
  const [dropState, setDropState] = useState(false)
  const toggleDropdown = () => {setDropState(!dropState)}
  // Clicking the 'Filter by Property' button toggles the dropdown menu
  return (
    <div className='dropdown'>
      <Tag label='Filter by Property' handle={toggleDropdown}/>
      <DropdownMenu handleFilter={props.handleFilter} dropState={[dropState, props.dropList]} />
    </div>
  )
}


//// #### Main Containers #### ////
// Containers for the main HTML Elements

// Container for the Ingredient Details View and Admin Functions
const DetailsBox = (props) => {
// Handle the View/Edit State
  const [editState, setEditState] = useState(false)
  const toggleEdit = () => {setEditState(!editState)}
// Make a copy of Object to Edit
  const [object, setObject] = useState('')
  return (
    <div className='container' style={{gridColumn: '2/2'}}>
      <DetailHeader editState={editState} objState={[object, setObject]}/>
      <PropertiesListBox editState={editState} objState={[object, setObject]}/>
      <AdminPanel editState={[editState, toggleEdit]} objState={[object, setObject]} functions={props.functions}/>
    </div>
  );
}

// Container for the Search/Filter Functionality
const SearchBox = (props) => {
  return (
    <div className='container' style={{gridColumn: '1/1', borderRight: '0.2vw groove'}}>
      <Header text='Search/Filter Ingredients'/>
      <TextInputBar label="Search" placeholder="Ingredient Name..." handle={props.handleSearch}/>
      <div style={{display: 'grid'}}>
        <Dropdown dropList={props.dropList} handleFilter={props.filterState[1]}/>
        <FilterTags filterState={props.filterState}/>
      </div>
    </div>
  );
}

// Container for Ingredient Library View
const LibraryBox = (props) => {
  return (
    <div className="library">
      <Header text='Ingredient Library'/>
      <IngredientListBox lib={props.lib}/>
    </div>
  );
}

// Container for the Login elements
const LoginBox = () => {
// Username and Password are empty by default
  const [username, setUsername] = useState('');
  const handleUser = (e) => {setUsername(e.target.value);}  
  const [password, setPassword] = useState('');
  const handlePassword = (e) => {setPassword(e.target.value);}
// Handle Logging in
  const [,setLogin] = useContext(UserContext)
  const loginToApp = () => {
    // When the user clicks the login button, the username and password are checked against the user list
    const user = userList.find(user => user.username === username);
    let loginValue = 'Error'
    if (user) {
      // If the username and password match, the user is logged in and the login value is set to the user's type
      if (user.password === password) {
        loginValue = user.type}}
    // Otherwise the login value is set to 'Error', and the InvalidLogin component is displayed
    setLogin(loginValue)}
  return (
    <div className='popup'>
      <Header text={'Login to view the'}/>
      <Header text={'Ingredient Library'}/>
      <InvalidLogin />
      <TextInputBar label="Username" placeholder="Username..." handle={handleUser}/>
      <TextInputBar label="Password" placeholder="Password..." handle={handlePassword}/>
      <Button label='Login' handle={loginToApp}/>
    </div>
  );
}


//// #### Master Containers #### ////
// Containers for the two main screens of the app

// Ingredient Library Screen [Displays if user is logged in]
const LibraryScreen = () => {
// Library State Management
  const [library, setLibrary] = useState(libraryArray);
  const handleLibrary = (newLibrary) => {
    // Sorts the library alphabetically by name
    setLibrary(newLibrary.sort((a, b) => a.nameStr.localeCompare(b.nameStr)))};
// Search/Filter State Management
  // The search bar is empty by default
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {setSearch(e.target.value)};
  // The filter list is empty by default
  const [filterList, setFilter] = useState([]);
  const handleFilter = (passedFilter) => {
    // Add passed filter to the filter list if it is not already there
    if (!filterList.includes(passedFilter)) 
    {setFilter([...filterList, passedFilter])}
    // Otherwise remove passed filter from the filter list
    else {setFilter(filterList.filter(prop => passedFilter !== prop))}};
// Library Editing Functions
  // Add New Ingredient to the library (replaces edited objects)
  const addObject = (object) => {
    // When called by the Save Button, the new object replaces the old object (which is the active object)
    // When called by the Add Button, the new object is added to the library and becomes the active object
    handleLibrary([...library.filter(ing => ing !== active), object]);
    // In either case, make the new object the active object
    setActive(object)};
  // Removes the active object from the library
  const removeActive = () => {
    handleLibrary(library.filter(ing => ing !== active));
    setActive('')};
// Process the Library for Display
  // If the search bar is not empty, the library is filtered by the value in the search bar
  const searchLib = (search.length > 0) ? library.filter(ing => ing.nameStr.includes(search)): library;
  // If the filter list is not empty, the library is filtered by the filter list
  const filterLib = (filterList !== []) ? searchLib.filter(ing => filterList.every(prop => ing.prop_list.includes(prop))): searchLib;
  // The ActiveLibrary is sorted alphabetically
  const activeLib = filterLib.sort((a, b) => a.nameStr.localeCompare(b.nameStr));
// By default, there is no active object
  const [active, setActive] = useState('');
  // I wanted there to be, but I couldn't get it to work
  // The line below gave me the behavior I wanted except you could no longer select an object from the library by clicking it
  // so I scrapped the idea
  // if (active !== activeLib[0]) {setActive(activeLib[0])};
// All unique properties in the library that are not in the filterList, for the filter dropdown
  const dropList = [...new Set(activeLib.map(ing => ing.prop_list).flat())].filter(prop => !filterList.includes(prop))
// Checks if User is logged in before displaying the Library Screen
  const [login,] = useContext(UserContext)
  if (login === 'Admin' || login === 'User') {
    return (
      <ActiveContext.Provider value={[active, setActive]}>
        <SearchBox handleSearch={handleSearch} dropList={dropList} filterState={[filterList, handleFilter]}/>
        <DetailsBox functions={[addObject, removeActive]}/>
        <LibraryBox lib={activeLib}/>
      </ActiveContext.Provider>
    )};
}

// Login Screen [Displays if user is not logged in]
const LoginScreen = () => {
  const [login,] = useContext(UserContext)
  if (login === false || login === 'Error') {
    return (
      <div className='login'>
        <LoginBox />
      </div>
  )}}


//// #### The Main App #### ////
export default function App() {
  // By default, the user is not logged in
  const [login, setLogin] = useState(false);
  return (
    <UserContext.Provider value={[login, setLogin]}>
      <div className='App'>
        <LoginScreen />
        <LibraryScreen />
      </div>
    </UserContext.Provider>
  );
}
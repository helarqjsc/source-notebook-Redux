let dbPath = execPath + 'db/data.json';

export function searchNotes(text) {
  return {
    type: 'SEARCH_NOTES',
    text,
  };
}


export function saveScroll() {
  return {
    type: 'SAVE_SCROLL',
  };
}


export function openNote(note) {
  return {
    type: 'OPEN_NOTE',
    note,
  };
}

export function closeNote() {
  return {
    type: 'CLOSE_NOTE',
  };
}

export function getNotes(data) {
  return {
    type: 'GET_NOTES',
    data,
  };
}

export function saveNote(note) {
  return {
    type: 'SAVE_NOTE',
    note,
  };
}

export function addNote(note) {
  return {
    type: 'ADD_NOTE',
    note,
  };
}

export function saveNotes(notes) {
  if (nw) {
    fs.writeFile(execPath + dbPath, JSON.stringify(notes));
  }
}

export function fetchNotes(callback) {
  // for nw.js
  if (nw) {
    return dispatch => {
      let data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      data = data.sort(function(a, b) {
        return b.id - a.id;
      });
      dispatch(getNotes(data));
    }
  } else { // for site
    return dispatch => {
      fetch(dbPath)
        .then(res =>
          res.json().then(data => {
            data = data.sort(function(a, b) {
              return b.id - a.id;
            });
            dispatch(getNotes(data));
          })
      );
    }
  }
}

export function deleteNote(id) {
  return {
    type: 'DELETE_NOTE',
    id,
  };
}
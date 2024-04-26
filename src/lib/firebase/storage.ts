import { getStorage, ref } from "firebase/storage";

// const storage = getStorage();

// const imagesRef = ref(storage, process.env.NEXT_PUBLIC_IMG_FOLDER_NAME);

// export { imagesRef, storage };

/* intro
// Create a child reference
const imagesRef = ref(storage, 'images');
// imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
const spaceRef = ref(storage, 'images/space.jpg');
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"

// Parent allows us to move to the parent of a reference
const imagesRefParent = spaceRef.parent;
// imagesRef now points to 'images'

// Root allows us to move all the way back to the top of our bucket
const rootRef = spaceRef.root;
// rootRef now points to the root

// child(), parent, and root can be chained together multiple times, as each returns a reference. The exception is the parent of root, which is null.

// References can be chained together multiple times
// const earthRef = ref(spaceRef.parent, 'earth.jpg'); //! ts accepts only storage for the first arg
// earthRef points to 'images/earth.jpg'

// nullRef is null, since the parent of root is null
const nullRef = spaceRef.root.parent;
*/

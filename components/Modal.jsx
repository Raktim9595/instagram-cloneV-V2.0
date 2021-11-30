import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { storage, db } from "../firebase";

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const {data:session} = useSession();

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      username:session?.user?.username,
      caption: captionRef.current.value,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `/posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(async snapShot => {
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadUrl,
      });
    });

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog 
        as='div'
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span aria-hidden="true" className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <img className="w-full object-contain cursor-pointer" src={selectedFile} alt="photo" onClick={() => setSelectedFile(null)} />
                ) : (
                  <div onClick={() => filePickerRef.current.click()} className="mx-auto h-12 w-12 flex items-center justify-center bg-red-100 cursor-pointer rounded-full">
                    <CameraIcon className="h-6 w-6 text-gray-500" aria-hidden="true"/>
                  </div>
                )}
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium">
                      Upload a Photo
                    </Dialog.Title>
                  </div>
                  <div>
                    <input onChange={addImageToPost} ref={filePickerRef} type="file" hidden/>
                  </div>
                  <div className="mt-2">
                    <input ref={captionRef} type="text" className="focus:ring-0 outline-none border-none" placeholder="enter a caption..." />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button disabled={!selectedFile} onClick={uploadPost} type="button" className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed border border-transparent">
                  {loading ? "uploading..." : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal;
import React, { useEffect, useRef, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { findTags } from "@/utils/jsHelper";
import './CreatePost.css'
import NotificationAlert from "../Default/NotificationAlert";

const CreatePost = ({ props }) => {
  const inputPost = useRef(null)
  const [description, setDescription] = useState("");
  const [limiter, setLimiter] = useState(200);
  const [isValid, setIsValid] = useState(true);
  const [textTagged, setTextTagged] = useState("");
  const [isLimit, setIsLimit] = useState(false);
  const [isErrorNotif, setIsErrorNotif] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [imagePreview, setImagePreview] = useState("");

  const regexHastag = new RegExp(/(^|\W)(#[a-z\d][\w-]*)/ig);

  useEffect(() => {
    let mount = true;
    if (limiter > 0) {
      const isEmptySpace = /^\s*$/.test(description);
      mount && description.length >= 10 && description.length <= 200 && !isEmptySpace
        ? setIsValid(true)
        : setIsValid(false);
    }
    return () => {
      mount = false;
    };
  }, [description.length]);

  useEffect(() => {
    props.errors ? setIsErrorNotif(true) : setIsErrorNotif(false)
  }, [props.errors])

  const handleImagePost = (e) => {
    setImageFile(e)
  }

  useEffect(() => {
    if (!imageFile || imageFile.length < 1) return;
    setImagePreview(URL.createObjectURL(imageFile))
    return () => setImagePreview("")
  }, [imageFile])

  const submitPost = () => {
    const data = {
      description: description,
      tags: textTagged.length > 0 ? textTagged[0].replace(/\s/g, "") : null,
      image: imageFile ? imageFile : null,
      token: props.auth.user.token,
    };

    return isValid && Inertia.post("/dashboard/manage-posts/posts", data);
  }

  const handlePostSubmit = (e) => {
    const newValue = e.target.innerHTML.replace(regexHastag, function (str) {
      return '<span class="highlighted">' + str + "</span>";
    });

    inputPost.current.innerHTML = newValue;
    const value = e.currentTarget.textContent
    setDescription(value);

    if (e.target.innerHTML.length > 200) {
      setIsLimit(true)
      return e.target.innerHTML = '';
    } else {
      setIsLimit(false)
    }

    const inputHashtag = findTags(e.target.innerHTML);
    setTextTagged(inputHashtag)

    const x = 200 - Number(e.target.innerHTML.length);
    if (x >= 0) {
      setLimiter(x);
    }
  };

  return (
    <div className="mx-auto max-w-7xl overflow-auto px-4 sm:px-6 lg:px-8 ">
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <div className="alert alert-sm w-full rounded-md bg-secondary text-secondary-content shadow-lg dark:bg-slate-700 dark:text-slate-300 lg:w-1/2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 flex-shrink-0 stroke-current ">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {isErrorNotif && <NotificationAlert message={props.errors.description} />}
            {isErrorNotif && props.errors.tags && <NotificationAlert message={props.errors.tags} />}
            {isErrorNotif && <NotificationAlert message={props.errors.image} />}
            <span>
              {!limiter
                ? "Ngetiknya udah dulu ya, simpen buat postingan berikutnya 👍"
                : `Saat ini postingan kamu dibatasi ${limiter} karakter`}
            </span>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          {imagePreview &&
            <div className="image-full pb-4"><img src={imagePreview} /></div>
          }
          <input className="p-4 w-full border border-spacing-1" type="file" name="image" accept="image/*" onChange={(e) => handleImagePost(e.target.files[0])} />
        </div>
        <i>{textTagged[0]}</i>
        <div className="relative w-full rounded-lg border-4 p-2 lg:w-1/2">
          <div
            aria-label="area"
            role="textbox"
            contentEditable
            value={description}
            className={`textarea-span real`}
            placeholder="Isi posting [min:10]"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onInput={handlePostSubmit}
          />
          <div className={`textarea-span input`} ref={inputPost} />
        </div>
        {isLimit &&
          <span className="lg:w-1/2 alert rounded:md alert-warning text-warning-content text-center">Mencapai batas limit text akan di hapus</span>
        }
        <button
          disabled={!isValid}
          className={
            !isValid
              ? "absolute bottom-16 z-3 btn-lg lg:btn-md lg:rounded-md left-0 lg:relative lg:bottom-0 lg:left-0 text-xl bg-secondary text-secondary-content py-2  lg:w-1/2 w-full dark:bg-slate-500 cursor-not-allowed"
              : "fixed bottom-16 z-3 btn-lg lg:btn-md lg:rounded-md left-0 text-xl lg:relative lg:bottom-0 lg:left-0 bg-primary text-primary-content py-2 hover:bg-secondary hover:text-secondary-content lg:w-1/2 w-full dark:bg-slate-700 cursor-pointer"
          }
          onClick={() => submitPost()}
        >
          Posting Sekarang
        </button>
      </div>
    </div>
  );
};

export default CreatePost;

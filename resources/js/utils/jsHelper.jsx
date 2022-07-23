import { formatDistance } from "date-fns";

export const formatTime = (time) => {
    const dateObject = formatDistance(new Date(time), new Date());
    const response = `${dateObject} ago`;
    return response;
};

export const randomColor = (param) => {
    let option;
    
    if (param == "hair") {
        option = ["Black", "Blonde", "Brown", "Auburn", "Blue", "Platinum", "Red", "SilverGray"];
    }

    if (param == "top") {
        option = [
            "NoHair",
            "Hijab",
            "Hat",
            "Turban",
            "WinterHat2",
            "LongHairBun",
            "LongHairFroBand",
            "LongHairShavedSides",
            "LongHairDreads",
            "ShortHairShaggyMullet",
            "ShortHairShortRound",
            "ShortHairTheCaesar",
        ];
    }

    if (param == "eyes") {
        option = ["Dizzy", "EyeRoll", "Hearts", "Side", "Surprised", "Wink", "Cry", "Close"];
    }

    if (param == "mouth") {
        option = ["Concerned", "Eating", "Sad", "Smile", "ScreamOpen", "Tongue", "Vomit"];
    }

    if (param == "facial") {
        option = ["BeardMedium", "BeardLight", "Blank", "BeardMajestic", "MoustacheFancy", "MoustacheMagnum"];
    }

    if (param == "shirt") {
        option = [
            "BlazerShirt",
            "BlazerSweater",
            "CollarSweater",
            "GraphicShirt",
            "Hoodie",
            "ShirtCrewNeck",
            "ShirtVNeck",
        ];
    }

    let generate = option[~~(Math.random() * option.length - 1)];
    
    return generate.toString();
};


import { randomWord } from "../utils";
class BaseControl {
    constructor(type, name) {
        this.type = type;
        this.name = name;
        this.key = randomWord(false, 9);
        this.id = type + "_" + this.key;
        this.lock = false;
    }
}

export default BaseControl;
export default class Todo {
  constructor(_id, contents, isCompleted = false) {
    this._id = _id;
    this.contents = contents;
    this.isCompleted = isCompleted;
  }

  edit(contents) {
    this.contents = contents;
  }

  toggle() {
    this.isCompleted = !this.isCompleted;
  }

  isSameId(id) {
    return this._id === id;
  }

  render() {
    const classList = [this.isCompleted ? "completed" : ""].join(" ");

    return `
      <li class="${classList}" data-id=${this._id}>
        <div class="view">
          <input 
            class="toggle" 
            type="checkbox" 
            ${this.isCompleted ? "checked" : ""}
          />
          <label class="label">${this.contents}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${this.contents}" />
      </li>
    `;
  }
}
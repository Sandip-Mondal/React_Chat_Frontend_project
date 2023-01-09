const chatListName = (users, ownId) => {
    const anotherUser = users.find((data) => {
        return data._id !== ownId;
    });
    return anotherUser;
}



export { chatListName };
const MyHeader = ({ headText, leftChild, rightChild }) => {
    return <header>
        <div className={"head_btn-left"}>
            {leftChild}
        </div>
        <div className={"head-text"}>
            {headText}
        </div>
        <div className={"head_btn-right"}>
            {rightChild}
        </div>

    </header>
}

export default MyHeader;
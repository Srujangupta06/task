function Modal({ children }) {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             w-[30%] min-h-[450px] bg-white rounded shadow">
            {children}
        </div>
    )
}

export default Modal
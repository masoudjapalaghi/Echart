function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while(n--){
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type:mime});
}

const useImage = () => {
  const [file, setFile] = useState(null)
  const handleChange = useCallback((e) => {
    if (e.target.files[0].type.match(/image.*/)) {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = (event) => {
            const image = new Image()
            image.onload = (el) => {
                const canvas = document.createElement('canvas')
                const max_size = 224
                let width = image.width
                let height = image.height
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width
                        width = max_size
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height
                        height = max_size
                    }
                }
                canvas.width = width
                canvas.height = height
                let ctx = canvas.getContext('2d', { alpha: false })
                ctx.drawImage(el.target, 0, 0, width, height)
                let dataUrl = canvas.toDataURL('image/jpeg', 1)
                setFile(dataURLtoFile(dataUrl, 'x-ray.png'))
            }
            image.src = event.target.result
        }
    } 
  }, [])

  return { file, handleChange }
}

// use
// const { file, handleChange } = useImage()




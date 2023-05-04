import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

export default Toast

// usage : see also doc : https://sweetalert2.github.io/#examples
// Toast.fire({
//   icon: 'success',
//   title: 'Signed in successfully'
// })

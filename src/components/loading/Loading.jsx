import style from './loading.module.css'

const Loading = () => {
  return (
    <div className={style.loaderContainer}>
    <div className={style.loader}>Loading...</div>
    </div>
  )
}

export default Loading
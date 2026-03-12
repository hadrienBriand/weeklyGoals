import {ref} from "vue"

interface Options<T>{
    immediate?:boolean,
    onSuccess?:(data:T) => void
    onError?:(error:Error) => void
}
const baseUrl = import.meta.env.VITE_API_URL


export function useFetch<T>(
    url:string,
    fetchOptions:RequestInit={},
    options:Options<T> = {}
){
    const { immediate = true, onSuccess, onError } = options

    const data = ref<T | null>(null)
    const error = ref<Error |null>(null)
    const loading= ref(false)

    const execute=async(body?:unknown):Promise<T |null> => {
        loading.value = true;
        error.value = null
        try {
            const options: RequestInit = { ...fetchOptions }
            if (body) {
                options.body = JSON.stringify(body)
                options.headers = {
                    ...options.headers,
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch(`${baseUrl}${url}`, options)
             if (!response.ok) {
                throw new Error(`Erreur ${response.status}`)
            }
           
             const result: T = await response.json()
            data.value = result
            onSuccess?.(result) 
            return result
        } catch (error:any) {
            error.value = error instanceof Error ? error : new Error(String(error))
            onError?.(error.value)
            return null
        }finally{
            loading.value=false
        }
    }
     
    if (immediate) {
    execute()
  }

  return { data, loading, error, execute }

}
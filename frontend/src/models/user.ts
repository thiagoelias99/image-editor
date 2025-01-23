export interface IUser {
  id: number
  name: string
  email: string
}

export interface IUserLoginDTO {
  email: string
  password: string
}

export interface IUserLoginResponseDTO {
  user: {
    id: number,
    name: string,
    email: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
  }
  token: string
}

export interface IUserRegisterDTO {
  name: string
  email: string
  password: string
  password_confirmation: string
}
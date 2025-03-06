export interface User {
  first_name: string;
  last_name: string;
  middle_name?: string;
  other_names?: string;
  date_of_birth: string;
  place_of_birth: string;
  current_address: string;
  phone_number: string;
  email: string;
  has_investment_license: boolean;
  investment_license_number: string;
  usdt_address: string;
  secret_phrase: string;
  wallet_type: string;
  image?: File; 
}

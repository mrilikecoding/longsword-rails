Longsword::Application.routes.draw do
  root 'home#index'
  match '/send_mail', to: 'contact#send_mail', via: 'post'
end

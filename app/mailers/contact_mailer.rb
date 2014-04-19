class ContactMailer < ActionMailer::Base
  default from: 'nathanrgreen@gmail.com'
  default to: 'nathanrgreen@gmail.com'

  def contact_email(name, email, body)
    @name = name
    @email = email
    @body = body

    mail(from: email, subject: 'Message from LongSwordVineyard.com')
  end
end
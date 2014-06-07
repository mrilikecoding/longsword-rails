class ContactMailer < ActionMailer::Base
  default from: 'no-reply@longswordvineyard.com'
  default to: 'matthewbsorensen@gmail.com'

  def contact_email(name, email, body)
    @name = name
    @email = email
    @body = body

    mail(from: email, subject: 'Message from LongSwordVineyard.com')
  end
end
package services

type MsgService struct{}

func (s *MsgService) SendMessage(msg string) string {
	return "reply: " + msg
}

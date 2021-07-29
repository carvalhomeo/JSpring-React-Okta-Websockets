package com.example.sample.controllers;

import com.example.sample.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebsocketController {
    private SimpMessagingTemplate template;

    @Autowired
    public WebsocketController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/notifications")
    //@SendTo("/topic/notification")
    public Notification greeting(Notification notification) throws Exception {
        String url = String.format("/topic/%s", notification.getEmail());

        this.template.convertAndSend(url, notification);

        return notification;
    }
}

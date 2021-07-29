package com.example.sample.controllers;

import com.example.sample.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class NotificationsController {
    private SimpMessagingTemplate template;

    @Autowired
    public NotificationsController(SimpMessagingTemplate template) {
        this.template = template;
    }


    @PostMapping(path="/notifications", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createNotification(@RequestBody Notification notification) {
        String url = String.format(String.format("/topic/%s", notification.getEmail()));
        this.template.convertAndSend(url, notification);
    }
}

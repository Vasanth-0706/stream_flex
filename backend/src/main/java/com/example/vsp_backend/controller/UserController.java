package com.example.vsp_backend.controller;

import com.example.vsp_backend.model.User;
import com.example.vsp_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{username}/counts")
    public CountsResponse getCounts(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        int history = user.getHistory() != null ? user.getHistory().size() : 0;
        int liked = user.getLikedVideos() != null ? user.getLikedVideos().size() : 0;
        int subscribed = user.getSubscriptions() != null ? user.getSubscriptions().size() : 0;
        return new CountsResponse(history, liked, subscribed);
    }

    public static class CountsResponse {
        public int history;
        public int liked;
        public int subscribed;

        public CountsResponse(int h, int l, int s) {
            this.history = h;
            this.liked = l;
            this.subscribed = s;
        }
    }
}

package com.davi.shop.controlers.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.davi.shop.dto.controller.location.StateDTO;
import com.davi.shop.controlers.StateAPI;
import com.davi.shop.services.StateService;

@RestController
public class StateResource implements StateAPI {

    @Autowired
    private StateService service;

    public ResponseEntity<Page<StateDTO>> findAllPaged(
	    Pageable pageable) {
	return ResponseEntity.ok()
		.body(service.findAllPaged(pageable));
    }

    public ResponseEntity<List<StateDTO>> findByCountryCode(
	    String countryCode) {
	List<StateDTO> list = service
		.findAllByCountryCode(countryCode);
	return ResponseEntity.ok().body(list);
    }
}

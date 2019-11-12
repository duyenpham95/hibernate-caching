package com.duyen.firstspringdata;

import com.duyen.firstspringdata.entities.Product;
import com.duyen.firstspringdata.repos.ProductRepository;
import org.hibernate.Session;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@SpringBootTest
@RunWith(SpringRunner.class)
public class FirstSpringDataApplicationTests {

	@Autowired
	ProductRepository productRepository;

	@Autowired
	EntityManager entityManager;

	@Test
	public void testCreate() {
		Product product = new Product();
		product.setId(1);
		product.setName("CD");
		product.setDesc("Eminem - Recovery");
		product.setPrice(15d);

		productRepository.save(product);
	}

	@Test
	public void testRead() {
		Product product = productRepository.findById(1).get();
		assertNotNull(product);
		assertEquals("CD", product.getName());
		assertEquals("Eminem - Recovery", product.getDesc());
	}

	@Test
	public void testUpdate() {
		Product product = productRepository.findById(1).get();
		product.setPrice(50d);
		productRepository.save(product);
	}

	@Test
	public void testDelete() {
		if (productRepository.existsById(1)) {
			System.out.println("Deleting a product");
			productRepository.deleteById(1);
		}
	}

	@Test
	@Transactional
	public void testCaching() {
		Product product = productRepository.findById(1).get();
		Product product1 = productRepository.findById(1).get();

		System.out.println(product);
		System.out.println(product1);
	}

	@Test
	@Transactional
	public void testEvictObject() {
		Session session = entityManager.unwrap(Session.class);

		Product product = productRepository.findById(1).get();
		System.out.println(product);

		session.evict(product);
		Product product1 = productRepository.findById(1).get();
		System.out.println(product1);
	}
}
